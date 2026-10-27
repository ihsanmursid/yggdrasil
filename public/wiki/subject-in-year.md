# Subject in year

Subject year: a subject offered on a class year. Admin enrolls students to a teacher (banding form).

See also:

- [sow.md](sow.md)
- [gradebooks.md](gradebooks.md)
- [academic-structure.md](academic-structure.md)
- [class-in-year.md](class-in-year.md)
- [programmes.md](programmes.md)
- [master-data.md](master-data.md)

## Routes

| Portal | Path | Notes |
| --- | --- | --- |
| Admin | `/subject-in-year` | Nav: Academic Year Data. `SUBJECT_MODULES.SUBJECT_IN_YEAR`. Also `:subjectYearId`, edit. |
| Admin | `/subject-in-year/:subjectYearId/enroll/:teacherId` | Enroll students to teacher. Component `BandingForm`. |
| Admin | `/subjects`, `/master-subjects` | Subject and master subject under Education Master Data. |
| Teacher | gradebook paths use `:subjectYearId` | Gradebook pages are [gradebooks.md](gradebooks.md) (sibling page). |
| Student | `/subjects`, `/subjects/:subjectYearId` | Read. Lessons under topic: [sow.md](sow.md). |

## Modules

Modules: subject-year, subject, master-subjects. Related: banding, homeroom-subject-teacher.

`STRICT_SUBJECT_YEAR_MATCH` on class-year transfer is encoded on [student-transfer.md](student-transfer.md). Default `true`.

No other encoded math in the scattered notes.

[Wiki home](README.md)
