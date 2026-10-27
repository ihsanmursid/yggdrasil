# Yellow reports

Read API over yellow discipline forms. Not a `ReportTypeEnum` member and not a `Report` row.

See also:

- [secondary-discipline.md](secondary-discipline.md)
- [discipline.md](discipline.md)
- [reports.md](reports.md)

## Route

`GET /v1/yellowReports/students/:studentId`. Query: `academicYearId`, `semester`. ACL READ on `ModulesTypeEnum.SECONDARY_DISCIPLINE_REPORT`. Service `YellowReportService.getReportForStudent`.

No `entities/` folder under `yellow-report`. Aggregation only.

## Aggregation

Loads `SecondaryDisciplineForm` where `formType === SecondaryDisciplineFormTypeEnum.YELLOW` (`'YELLOW'`), matching `studentId`, `academicYearId`, and terms from `getTermsForSemester(semester)`.

`printDate` comes from `MeritReportSetting.printDate` for that campus, academic year, and semester, else `new Date()`.

`totalPoints` is the sum of `form.point` (row field `point`, default 0).

Yellow and merit form CRUD stays on [secondary-discipline.md](secondary-discipline.md). Do not duplicate it here.

[Wiki home](README.md)
