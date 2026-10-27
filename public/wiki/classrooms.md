# Classrooms

Classroom master in admin. Teacher and student open class-year classrooms, not this master list.

See also:

- [class-in-year.md](class-in-year.md)
- [attendance.md](attendance.md)
- [academic-structure.md](academic-structure.md)
- [students.md](students.md)
- [campuses.md](campuses.md)

## Routes

| Portal | Path | Notes |
| --- | --- | --- |
| Admin | `/classes` | Nav: Education Master Data / Classroom. `SUBJECT_MODULES.CLASS`. Also `/classes/add`, `/classes/:classId`, `/classes/:classId/edit`. |
| Teacher | `/classrooms` | Class-year list. Details `/classrooms/:classYearId`. Student `/classrooms/:classYearId/:studentId`. Report viewer `/classrooms/:classYearId/:term/:reportType`. |
| Student | `/classroom` | Detail `/classroom/:classYearId`. |

This page is the classroom master (`classroom`). The year cohort is [class-in-year.md](class-in-year.md) (`class-year`).

## Modules

Module: classroom.

No encoded math in the scattered notes.

[Wiki home](README.md)
