# LEAPS

LEAPS types and events. Teacher form-class records events. No invented scores.

See also:

- [certificates.md](certificates.md)
- [primary-reports.md](primary-reports.md)
- [identity.md](identity.md)
- [academic-structure.md](academic-structure.md)
- [report-types.md](report-types.md)

## Admin routes

| Nav group | Nav | Path |
| --- | --- | --- |
| Non Education Master Data | LEAPS Type | `/leaps-type` |
| Academic Year Data | LEAPS Event | `/leaps-event`, `/add`, `/:leapsEventId`, `/:leapsEventId/edit` |

## Teacher routes

Form-class adjacent nav: `/leaps`, `/leaps/add`, `/leaps/:leapsEventId`, `/leaps/:leapsEventId/edit`. Subject `LEAPS_EVENT`.

## Modules

Modules: leaps-*.

A name with `*` is a prefix. Related: leaps-type, leaps-event, student-leaps-remark.

API: `/v1/leapsEvents`.

No extra numeric formulas for LEAPS in the scattered notes. Do not invent LEAPS scores.

LEAPS report type (`ReportTypeEnum.LEAPS`) is `createStudentLeapsReport` (`distinctOn leapsEventId`, newest remark wins). Details: [report-types.md](report-types.md).

Portal: admin configures types and events. Teacher form-class records LEAPS. Student does not own this write path.

[Wiki home](README.md)
