# Secondary discipline

Secondary category, yellow and merit forms, reports, verify-conduct, and reductions.

See also:

- [discipline.md](discipline.md)
- [secondary-gradebook.md](secondary-gradebook.md)
- [certificates.md](certificates.md)
- [discounts.md](discounts.md)
- [yellow-reports.md](yellow-reports.md)

## Admin routes

Same Discipline nav as [discipline.md](discipline.md), lower items:

| Nav | Path |
| --- | --- |
| Secondary Discipline Category | `/secondary-discipline-category`, `/add`, `/:secondaryDisciplineCategoryId/edit` |
| Secondary Discipline | `/secondary-discipline` |
| Yellow form | `/secondary-discipline/yellow/add` |
| Merit form | `/secondary-discipline/merit/add` |
| Secondary Discipline Report | `/secondary-discipline-report` |
| Secondary Verify Conduct | `/secondary-verify-conduct` |
| Discount Reduction | `/secondary-discipline-discount-reduction`, `/add` |
| Reduction | `/secondary-discipline-reduction` |

Discount reduction here is a secondary-discipline screen. Master fee discounts: [discounts.md](discounts.md).

Teacher form-class Conduct (`/conduct`) is the primary/secondary conduct remark path, not this module. See [primary-reports.md](primary-reports.md).

## Modules

Modules: secondary-discipline-*.

A name with `*` is a prefix. Related: secondary-discipline-category, secondary-discipline-discount-reduction, secondary-discipline-form, secondary-discipline-reduction, master-secondary-discipline-merit, merit-report, secondary-verify-conduct.

Portal: admin. Teacher does not have these secondary-discipline SPA routes.

Yellow report read API (`GET /v1/yellowReports/students/:studentId`): [yellow-reports.md](yellow-reports.md). Form CRUD stays on this page.

[Wiki home](README.md)
