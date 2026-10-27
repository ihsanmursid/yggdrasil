# Report print

Print uses stored `report.html`, not a live render endpoint. Conversion is `html-to-pdfmake`.

See also:

- [reports.md](reports.md)
- [report-types.md](report-types.md)
- [report-generate.md](report-generate.md)
- [report-settings.md](report-settings.md)
- [certificates.md](certificates.md)

## Stored HTML

Admin `bbs/client/src/views/studentReports/ReportCard.jsx` maps `studentReport.reportsIds` for the selected term. Each `Report.html` is passed to `htmlToPdfmake`. There is no `GET /v1/reports/render`.

Filter out `LEARNING_OUTCOME`, `SED`, and `SPR` before print. Sort with `sortingPreference = ["REPORT_TERM", "REPORT_SEMESTER", "LEAPS", "FTP"]` via lodash `sortBy` plus `indexOf`. Types not in that list sort after.

## Cover letter terms 1 and 3

When `term` is 1 or 3, `generateReports` dispatches `fromApi.getReportLetter` (`GET /v1/reportSettings/letter`) with `classYearId`, `level`, `masterLevelId`, `term`. Non-empty `html` becomes the first PDF blob (`generateLetter`). Term 2 and term 4 skip this letter fetch.

## Term 4 finalReport

When `term === 4`, `finalReport()` runs instead of per-type `compilePdf`. It `createReport`s `REPORT_SEMESTER` (even term), `FTP_EVALUATION`, and `LEAPS`, joins HTML with a page-break heading, then merges Cambridge PDFs. Needs an existing `StudentReport` for that class year.

## A5 to A4 scale

Combined (A4) print upsizes A5-tuned semester HTML. `A5_BASE_FONT = 9`, `A4_BASE_FONT = 12`, `A5_TO_A4_SCALE = A4_BASE_FONT / A5_BASE_FONT`. `upsizeSemesterContentToA4` scales a node with `fontSize === 9` and `lineHeight === 0.85`. Single-report A5 views in `ReportList.jsx` and class-report viewers do not use this scale.

## canView vs canViewCertificates

| Flag | Default | Toggle |
| --- | --- | --- |
| `Report.canView` | `false` | POST `/v1/reports/disable-undisable-view-report` (`disableUndisableViewReport`). Sets `canView` by term, optional `studentReportId`, `classYearId`, or campus plus academic year. |
| `StudentReport.canViewCertificates` | `false` | POST `/v1/studentReports/toggle-view-certificate`. Different column, different route. |

Student `/report` shows a type only when that `Report.canView` is true.

## Teacher and admin class report

Teacher `bbs/client-teacher/src/views/classrooms/viewer/ClassReportViewer.jsx` at `/classrooms/:classYearId/:term/:reportType`. Same stored snapshots, `htmlToPdfmake`, same `sortingPreference`.

Admin class report is gated `SUBJECT_MODULES.CLASS_REPORT` (`"ClassReport"`) on `/class-report` and `/class-report/:classYearId/:term/:reportType`. Viewer `bbs/client/src/views/classReports/ClassReportViewer.jsx`. Same `Report.html` snapshots. `ModulesTypeEnum` on the API has `STUDENT_REPORT`, not `CLASS_REPORT`.

[Wiki home](README.md)
