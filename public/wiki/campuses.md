# Campuses

Campuses, branches, and campus programmes. Org units that scope the rest of the catalog.

See also:

- [academic-year.md](academic-year.md)
- [programmes.md](programmes.md)
- [identity.md](identity.md)
- [academic-structure.md](academic-structure.md)
- [employees.md](employees.md)
- [access.md](access.md)

## Routes

| Portal | Path | Notes |
| --- | --- | --- |
| Admin | `/campuses` | Nav: School Master Data. `SUBJECT_MODULES.CAMPUS`. Nested programme add/edit/assign under `/campuses/:campusId/...`. Assign employee: `/campuses/:campusId/assign-employee`. |
| Admin | `/branches` | `SUBJECT_MODULES.BRANCH`. Assign employee: `/branches/:branchId/assign-employee`. |
| Admin | `/campus-programmes` | `SUBJECT_MODULES.PROGRAMME`. Assign employee and campus assign subroutes exist. |
| Teacher | none for this CRUD | Campus-scoped lists only. |
| Student | none for this CRUD | |

Master programme and level (not the campus offering): [programmes.md](programmes.md) `/programme`.

## Modules

Modules: campus, campus-gate, branch, programme.

MUST: campus-scope CASL checks on org writes. Encoded on [identity.md](identity.md).

No encoded math in the scattered notes.

[Wiki home](README.md)
