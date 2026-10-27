# Reports

Index of student report snapshots, class-report print, settings, transcripts, and yellow reads. These are not one object. REALTIME_REPORTS_PLAN is a plan.

See also:

- [primary-reports.md](primary-reports.md)
- [certificates.md](certificates.md)
- [spr-sed.md](spr-sed.md)
- [lo-settings.md](lo-settings.md)
- [awardees.md](awardees.md)
- [report-types.md](report-types.md)
- [report-generate.md](report-generate.md)
- [report-print.md](report-print.md)
- [report-settings.md](report-settings.md)
- [student-transcripts.md](student-transcripts.md)
- [yellow-reports.md](yellow-reports.md)
- [secondary-gpa.md](secondary-gpa.md)
- [leaps.md](leaps.md)

## Object model

| Object | What it is |
| --- | --- |
| `StudentReport` | One row per `(student, classYear)`. Parent of `Report` rows. Flag `canViewCertificates`. |
| `Report` | HTML snapshot keyed by `(studentReportId, reportType, term)`. Enum `ReportTypeEnum`. Flag `canView`. |
| Class report | Admin `/class-report` print of the same `Report.html` snapshots. SPA ACL `SUBJECT_MODULES.CLASS_REPORT`. |
| Transcript | Primary 6 PDF from `StudentGrade`. Not a `Report` row. [student-transcripts.md](student-transcripts.md) |
| Yellow report | Read aggregation of yellow discipline forms. Not a `ReportTypeEnum`. [yellow-reports.md](yellow-reports.md) |

Modules (separate folders, not one object): report, report-setting, student-report, student-transcript, yellow-report.

## Generate and print

Generate: POST `/v1/reports` and POST `/v1/reports/update` both call `reportService.create()`. Details: [report-generate.md](report-generate.md).

Print: `ReportCard.jsx` reads stored `report.html` through `htmlToPdfmake`. Details: [report-print.md](report-print.md).

## Type matrix

| Type | Page |
| --- | --- |
| Enum 1 to 12, helpers, LO rewrite, UI matrix, Handlebars | [report-types.md](report-types.md) |
| Settings JSON and helper gates | [report-settings.md](report-settings.md) |
| GPA `ReportTypeEnum.GPA` roll-up | [secondary-gpa.md](secondary-gpa.md) |
| LEAPS events vs LEAPS report type | [leaps.md](leaps.md) |
| SPR and SED admin (report types exist, UI unused) | [spr-sed.md](spr-sed.md) |
| Learning-outcome rewrite source | [lo-settings.md](lo-settings.md) |

## Admin

| Route | Notes |
| --- | --- |
| /class-report | Class report. Also /class-report/:classYearId/:term/:reportType |
| /student-report | Student report |
| /report-setting | Settings. Also /report-setting/add, /report-setting/:reportSettingId/edit |
| /student-transcripts | Transcripts |

## Teacher

Classroom term reports: `/classrooms/:classYearId/:term/:reportType`. Classrooms list `/classrooms`, `/classrooms/:classYearId`, `/classrooms/:classYearId/:studentId`. No generate modal.

## Student

`/report`. Cannot generate.

## REALTIME_REPORTS_PLAN is a plan

[REALTIME_REPORTS_PLAN.md](../REALTIME_REPORTS_PLAN.md) is a plan, not a shipped contract. Do not treat on-demand render or finalize/lock as current MUST rules unless code already does that. The plan states reports must not silently rewrite issued records.

Generate today (that plan, verified architecture): `POST /v1/reports` to `createStudentReport()` to per-type helper to Handlebars to `report.service.ts` saves HTML into `report.html` (frozen snapshot). Print today: `ReportCard.jsx` fetches stored `report.html`.

Report types named there (`api_nest/src/types/enums/report-type.ts`): REPORT_TERM, REPORT_SEMESTER, LEAPS, SED, SPR, FTP, LEARNING_OUTCOME, FTP_EVALUATION, CAMBRIDGE_IGCSE, CAMBRIDGE_ASLEVEL, CAMBRIDGE_ALEVEL, GPA. Separate Primary vs Secondary helpers for term, semester, and GPA. The plan counts 12 types and about 16 variants. Live dispatch: [report-types.md](report-types.md).

Proposed (not MUST): `GET /v1/reports/render?studentReportId=&term=&reportType=` without writing to the DB; finalize/lock so issued reports do not change. Timeline in that file is about 11 to 15 weeks for one developer. Do not copy that schedule as a live SLA. That GET does not exist on `report.controller.ts`.

[Wiki home](README.md)
