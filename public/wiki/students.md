# Students

Student records in the admin portal. Teacher opens a student from a class year. The student portal does not administer this.

See also:

- [identity.md](identity.md)
- [parents.md](parents.md)
- [pickup.md](pickup.md)
- [student-transfer.md](student-transfer.md)
- [student-billing.md](student-billing.md)
- [promote.md](promote.md)

## Routes

| Portal | Path | Notes |
| --- | --- | --- |
| Admin | `/students` | Nav: Parent & Student Account. `SUBJECT_MODULES.STUDENT`. Also `/students/add`, `/students/:studentId`, `/students/:studentId/edit`. |
| Teacher | `/classrooms/:classYearId/:studentId` | Student details under a class year. Not student CRUD. |
| Student | none | Student has no admin of this. |

Files: `bbs/client/src/containers/_nav.jsx`, `bbs/client/src/routes.js`, `bbs/client-teacher/src/routes.js`.

## Modules

Module: student. Related: parent, class-year. Billing for a student: [student-billing.md](student-billing.md) (finance cluster; page may still be a stub).

MUST NOT: count withdrawn or inactive students in attendance totals, daily-complete checks, or student headcount. Encoded on [rules.md](rules.md) and [attendance.md](attendance.md): `studentStatus` CURRENT and `activeStatus` ACTIVE only.

Class-year transfer of grades is not student CRUD. See [student-transfer.md](student-transfer.md).

No other encoded math in the scattered notes.

[Wiki home](README.md)
