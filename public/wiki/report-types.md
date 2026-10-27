# Report types

`ReportTypeEnum` (numeric 1 to 12), helper dispatch, Primary vs Secondary split, LO rewrite, and Handlebars inventory.

See also:

- [reports.md](reports.md)
- [report-generate.md](report-generate.md)
- [report-print.md](report-print.md)
- [report-settings.md](report-settings.md)
- [lo-settings.md](lo-settings.md)
- [spr-sed.md](spr-sed.md)
- [leaps.md](leaps.md)
- [secondary-gpa.md](secondary-gpa.md)
- [cambridge.md](cambridge.md)
- [prelims.md](prelims.md)

## Enum

`api_nest/src/types/enums/report-type.ts`. `REPORT_TERM = 1`, then auto-increment.

| Value | Member |
| --- | --- |
| 1 | `REPORT_TERM` |
| 2 | `REPORT_SEMESTER` |
| 3 | `LEAPS` |
| 4 | `SED` |
| 5 | `SPR` |
| 6 | `FTP` |
| 7 | `LEARNING_OUTCOME` |
| 8 | `FTP_EVALUATION` |
| 9 | `CAMBRIDGE_IGCSE` |
| 10 | `CAMBRIDGE_ASLEVEL` |
| 11 | `CAMBRIDGE_ALEVEL` |
| 12 | `GPA` |

Remark is not a `ReportTypeEnum` member. Class remark HTML is `createRemarkReport` in `remark-report.helper.ts` with `student-remark-report.hbs`.

## Helper dispatch

`createStudentReport()` in `api_nest/src/helpers/create-report.helper.ts`. Input `reportType` is the enum member name string. Dispatch is `switch (ReportTypeEnum[reportType])`.

| Case | Helper |
| --- | --- |
| `FTP` | `createStudentFtpReport` |
| `SPR` | `createStudentSprReport` |
| `SED` | `createStudentSedReport` |
| `LEAPS` | `createStudentLeapsReport` |
| `REPORT_TERM` | Secondary helper if `[3, 4].includes(masterProgramme.id)`, else `createStudentTermReport` |
| `REPORT_SEMESTER` | Secondary helper if `[3, 4].includes(masterProgramme.id)`, else `createStudentSemesterReport` |
| `LEARNING_OUTCOME` | `createLoReport` |
| `FTP_EVALUATION` | `createStudentFtpEvaluationReport` |
| `CAMBRIDGE_IGCSE`, `CAMBRIDGE_ASLEVEL`, `CAMBRIDGE_ALEVEL` | `createStudentCambridgeReport` |
| `GPA` | `createSecondaryStudentGpaReport` |
| default | `BadRequestException` `Unsupported report type` |

`MasterProgramme` lookup and the `[3, 4]` test run only when the incoming type is `REPORT_TERM` or `REPORT_SEMESTER`. Other types do not branch on `masterProgramme.id`. What names sit on ids 3 and 4 is UNKNOWN from the seeder (ids are not hardcoded there).

## LO rewrite MUST

If the incoming type is `REPORT_TERM` or `REPORT_SEMESTER`, load `GradingGuide` by `masterLevelId`. If `gradingGuide?.gradingGuideType === GradingGuideTypeEnum.LEARNING_OUTCOME`, set `reportType = ReportTypeEnum[ReportTypeEnum.LEARNING_OUTCOME]` (`"LEARNING_OUTCOME"`) before the switch. Then the `LEARNING_OUTCOME` case runs `createLoReport`. `GradingGuideTypeEnum`: `GRADEBOOK = 1`, `LEARNING_OUTCOME = 2`. Grading-guide module: [other-modules.md](other-modules.md). LO admin: [lo-settings.md](lo-settings.md).

## LEAPS helper

`createStudentLeapsReport`: `StudentLeapsRemark.createQueryBuilder` `.distinctOn(['slr.leapsEventId'])`, `orderBy leapsEventId`, then `updatedAt DESC`, then `id DESC`. Newest remark wins. Template `student-leaps-report.hbs`. Event CRUD: [leaps.md](leaps.md).

## GPA helper

Roll-up is encoded in `secondary-gpa-report.helper.ts`. Do not copy FYA percents here. Details: [secondary-gpa.md](secondary-gpa.md). Template `secondary-student-gpa-report.hbs`.

## listReportsByTerm UI matrix

`bbs/client/src/utils/utilFunctions.js` `listReportsByTerm(term, level, opts)`. `hideFtp` drops FTP from `commonReports`. Admin generate modal sets `{ hideFtp: isSecondary }` when `classYear.level` starts with `SECONDARY` or `JUNIOR_COLLEGE`. SED is commented out in that helper. SPR is commented out.

| Term | Types offered |
| --- | --- |
| 1 | FTP unless `hideFtp`, plus `REPORT_TERM` |
| 3 | Same as term 1 |
| 2 | FTP unless `hideFtp`; `GPA` if level includes `COLLEGE` or `SECONDARY`; `REPORT_SEMESTER`; plus `CAMBRIDGE_ASLEVEL` when `level === "JUNIOR_COLLEGE2"` |
| 4 | FTP unless `hideFtp`; `GPA` if level includes `COLLEGE` or `SECONDARY`; `REPORT_SEMESTER`; `FTP_EVALUATION`; `LEAPS`; plus `CAMBRIDGE_ALEVEL` when `JUNIOR_COLLEGE2`; plus `CAMBRIDGE_IGCSE` when `SECONDARY4` or `JUNIOR_COLLEGE1` |
| other | `[]` |

Generate modal (`ModalGenerateReport.jsx`) then `.filter((r) => r?.reportType !== "FTP_EVALUATION")`, so `FTP_EVALUATION` never appears in the update-report checklist even on term 4.

`ReportCard.jsx` stored-html list drops `LEARNING_OUTCOME`, `SED`, and `SPR` (comments: unused, LO shown as progress). `ReportList.jsx` sort list also comments out `SED` and `SPR`.

Teacher SPR and SED SPA routes are commented as of 2026-09-02. See [spr-sed.md](spr-sed.md). Helpers and templates for SPR and SED still exist.

## Handlebars inventory

Directory `api_nest/src/templates/student-reports/`.

| File | Helper reference |
| --- | --- |
| `student-progress-report.hbs` | `progress-report.helper.ts` |
| `secondary-student-progress-report.hbs` | `secondary-progress-report.helper.ts` |
| `student-semester1-report-p3-6.hbs` | `semester-report.helper.ts` (primary semester 1) |
| `student-semester1-report-sec.hbs` | `semester-report.helper.ts` (non-primary semester 1) |
| `student-semester2-report.hbs` | `semester-report.helper.ts` (semester 2) |
| `secondary-semester1-mye-report.hbs` | `secondary-semester-report.helper.ts` |
| `secondary-semester1-report.hbs` | `secondary-semester-report.helper.ts` |
| `secondary-semester2-mye-report.hbs` | `secondary-semester-report.helper.ts` |
| `secondary-semester2-report.hbs` | `secondary-semester-report.helper.ts` |
| `student-learning-outcome-report.hbs` | `lo-report.helper.ts` |
| `student-learning-outcome-report-odd-term.hbs` | `lo-report.helper.ts` |
| `student-learning-outcome-footer.hbs` | `lo-report.helper.ts` |
| `student-ftp-report.hbs` | `ftp-report.helper.ts` |
| `student-ftp-evaluation-report.hbs` | `ftp-evaluation-report.helper.ts` |
| `student-leaps-report.hbs` | `leaps-report.helper.ts` |
| `student-spr-report.hbs` | `spr-report.helper.ts` (UI unused) |
| `student-sed-report.hbs` | `sed-report.helper.ts` (UI unused) |
| `student-cambridge-report.hbs` | `cambridge-report.helper.ts` |
| `student-a-level-prelim-report.hbs` | `cambridge-report.helper.ts` |
| `secondary-student-gpa-report.hbs` | `secondary-gpa-report.helper.ts` |
| `report-letter.hbs` | `report-letter.helper.ts` |
| `student-remark-report.hbs` | `remark-report.helper.ts` (not a `ReportTypeEnum`) |
| `student-transcript.hbs` | `transcript-pdf.helper.ts` (not a `Report` row) |
| `student-transcript-pik.hbs` | `transcript-pdf.helper.ts` (not a `Report` row) |

Unused (no `.ts` or `.js` helper reference):

| File |
| --- |
| `student-gpa-transcript.hbs` |
| `student-mid-gpa-report.hbs` |
| `student-as-prelim-report.hbs` |
| `student-semester1-report-p1-2.hbs` |
| `index.html` |

[Wiki home](README.md)
