# Programmes

Programme and master level. Admin nav label is Programme & Level.

See also:

- [secondary-gradebook.md](secondary-gradebook.md)
- [awardees.md](awardees.md)
- [academic-structure.md](academic-structure.md)
- [campuses.md](campuses.md)
- [class-in-year.md](class-in-year.md)
- [master-data.md](master-data.md)

## Routes

| Portal | Path | Notes |
| --- | --- | --- |
| Admin | `/programme` | Nav: Programme & Level. `SUBJECT_MODULES.MASTER_PROGRAMME_AND_LEVEL`. Also `/programme/add`, `/programme/:programmeId`, `/programme/:programmeId/edit`, `/programme/:programmeId/level`. |
| Admin | `/campus-programmes` | Campus offering. See [campuses.md](campuses.md). |
| Teacher | none for this CRUD | |
| Student | none | |

## Modules

Modules: programme, master-programme, master-level.

## Master level ids

Secondary grading uses master level ids 7-17. See [secondary-gradebook.md](secondary-gradebook.md).

Primary EMSCBI awardees use `ml_id` 1 and 2. See [awardees.md](awardees.md).

Do not assume other IDs from this file. Encoded on [academic-structure.md](academic-structure.md).

No other encoded math in the scattered notes.

[Wiki home](README.md)
