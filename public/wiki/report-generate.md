# Report generate

How a `Report` HTML snapshot is created. Both generate POST routes call `reportService.create()`.

See also:

- [reports.md](reports.md)
- [report-types.md](report-types.md)
- [report-print.md](report-print.md)
- [report-settings.md](report-settings.md)
- [student-transcripts.md](student-transcripts.md)

## Routes

`api_nest/src/modules/report/report.controller.ts`. Timeout `@SetRequestTimeout(60000)` on both POSTs.

| Method | Path | ACL on controller | Service |
| --- | --- | --- | --- |
| POST | `/v1/reports` | no `@CheckPermissions` | `reportService.create()` |
| POST | `/v1/reports/update` | `STUDENT_REPORT` UPDATE, VIEW, READ | `reportService.create()` |

There is no `GET /v1/reports/render`. That path is a plan only. See [reports.md](reports.md).

`report.service.ts` also defines `updateGeneratedReport()`. The `/update` controller method does not call it. Both live POSTs call `create()`.

## Unique key and overwrite

Lookup existing row: `Report.findOneBy({ studentReport: { id: studentReportId }, reportType: ReportTypeEnum[options.reportType], term: options.term })`.

If a row exists, `create()` calls `this.update(id, callerUserId, { html, weightedAverage })`. No new row. `update()` sets `html` when provided. `weightedAverage` is written only when the incoming value is truthy, `>= 0`, and different from the stored value. There is no `Unique()` decorator on that triple. Uniqueness is this find-then-update.

No finalize or lock. `Report.reportStatus` is commented out. `ReportStatusTypeEnum` (`ON_PROGRESS`, `DONE`) exists and is unused on the entity.

## Terms

`VALID_TERMS = [1, 2, 3, 4]`. Other terms throw `InvalidReportTermError`. Backend `create()` does not read `academicYear.termNStartDate`.

Admin UI `validateTerm` in `StudentReports.jsx` compares `moment().unix()` to `academicYear.term1StartDate` through `term4StartDate`. Client-only.

## Homeroom and student status

Homeroom-only generate is commented out in `report.service.ts` (`OnlyHomeroomTeacherAllowedToFillStudentReport`). Same comment in `student-report.service.ts` create.

Generate UI lists students with `activeStatus: "ACTIVE"` (`ModalGenerateReport.jsx`, `StudentReports.jsx` `studentsQuery`). Backend `create()` does not check student `CURRENT` or `ACTIVE`. Do not treat CURRENT plus ACTIVE as a report MUST.

## StudentReport prerequisite

Admin generate builds jobs only from existing `StudentReport` rows for the selected class year. `postStudentReport` create-if-missing is commented out in `StudentReports.jsx`. Missing `studentReportId` yields `NoStudentReportFoundError`.

`StudentReport` create (`POST /v1/studentReports`) requires the student on `classYear.students`. Else `StudentNotInClassYearError` (`'Student not registered in class year'`). Duplicate `(student, classYear)` throws `StudentReportAlreadyExistsError` via `checkDuplicate`. One `StudentReport` per `(student, classYear)`. No `Unique()` decorator.

## Client split, same create()

Admin `generateReport()`:

| Types | Client action | HTTP |
| --- | --- | --- |
| `CAMBRIDGE_IGCSE`, `CAMBRIDGE_ASLEVEL`, `CAMBRIDGE_ALEVEL` | `createReportSilent` | POST `/v1/reports` |
| all other selected types | `updateGeneratedReportSilent` | POST `/v1/reports/update` |

Both hit `reportService.create()`.

## A-level exclusion

`banding.excludeFromAlevelReportStudentIds` is applied only when `reportType === ReportTypeEnum.CAMBRIDGE_ALEVEL`. Helper `getExcludedAlevelSubjectYearIds` in `cambridge-report-exclusion.helper.ts`. Other Cambridge types ignore that array.

## Who generates

| Actor | Generate |
| --- | --- |
| Admin | Update Report modal. Button gated `BBSCan I={ACTION_MODULES.VIEW} a={SUBJECT_MODULES.STUDENT_REPORT}`. |
| Teacher | No `ModalGenerateReport`. Classroom print can still `POST /v1/reports` for Cambridge and combined term 4. |
| Student | Cannot generate. `/report` reads stored rows. |

[Wiki home](README.md)
