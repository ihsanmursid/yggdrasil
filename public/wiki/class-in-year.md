# Class in year

Class year: a classroom plus programme plus academic year. Admin attendance subroute lives here. Transfer and promotion hang off this entity.

See also:

- [student-transfer.md](student-transfer.md)
- [promote.md](promote.md)
- [attendance.md](attendance.md)
- [classrooms.md](classrooms.md)
- [academic-year.md](academic-year.md)
- [students.md](students.md)

## Routes

| Portal | Path | Notes |
| --- | --- | --- |
| Admin | `/class-in-year` | Nav: Academic Year Data. `SUBJECT_MODULES.CLASS_IN_YEAR`. Also add, `:classInYearId`, edit. |
| Admin | `/class-in-year/:classInYearId/attendance` | Add attendance in class. Component `ClassInYearAttendance`. |
| Teacher | `/classrooms/:classYearId` | Teacher does not own the admin class-in-year list. |
| Student | `/classroom/:classYearId` | Read. |

## Modules

Module: class-year. Related: classroom, attendance, student-promotion.

Class-year transfer of grades is orchestrated in `class-year.service.ts`. See [student-transfer.md](student-transfer.md). It is not CCA transfer.

Attendance totals: CURRENT+ACTIVE only. Encoded on [attendance.md](attendance.md) and [rules.md](rules.md).

No other encoded math in the scattered notes.

[Wiki home](README.md)
