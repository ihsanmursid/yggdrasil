# Promote

Promote students between class years. Admin `/promote`. Teacher form-class streaming and promotion. This is not class-year grade transfer and not CCA transfer.

See also:

- [class-in-year.md](class-in-year.md)
- [students.md](students.md)
- [student-transfer.md](student-transfer.md)
- [academic-structure.md](academic-structure.md)
- [certificates.md](certificates.md)
- [academic-year.md](academic-year.md)

## Routes

| Portal | Path | Notes |
| --- | --- | --- |
| Admin | `/promote` | Nav: Academic Year Data / Promote Student. `SUBJECT_MODULES.PROMOTE_STUDENT`. Class year `/promote/:classYearId`. |
| Admin | `/migrate-student-grades` | Same subject. Component `StudentsPromoteMigrateGrades`. |
| Teacher | `/streaming-and-promotion` | Form class. `SUBJECT_MODULES.STREAMING_AND_PROMOTION`. Also `/streaming-and-promotion/:classYearId/:academicYearId`. |
| Student | none | |

## Modules

Module: student-promotion.

Class-year transfer of grades (studentFrom to studentTo, same academic year) is a separate feature. See [student-transfer.md](student-transfer.md). CCA transfer: [cca.md](cca.md).

No encoded math in the scattered notes. Do not invent promotion score formulas.

[Wiki home](README.md)
