# Student pick-up

Pick-up persons, settings, check-in/out, and release. Admin owns setup. Teacher can release. There is no parent SPA, so parent pick-up UI is out of this repo.

See also:

- [attendance.md](attendance.md)
- [students.md](students.md)
- [identity.md](identity.md)
- [access.md](access.md)
- [class-in-year.md](class-in-year.md)

## Routes

| Portal | Path | Notes |
| --- | --- | --- |
| Admin | `/student-pick-up` | Nav: Attendance. `SUBJECT_MODULES.STUDENT_PICK_UP`. Also `:studentId`, edit. |
| Admin | `/student-pick-up-setting` | `SUBJECT_MODULES.STUDENT_PICK_UP_SETTING`. Also add and edit. |
| Admin | `/checking` | Nav: Check in & Check Out. `SUBJECT_MODULES.ATTENDANCE`. |
| Admin | `/release-student` | `SUBJECT_MODULES.STUDENT_PICK_UP_REQUEST`. |
| Teacher | `/release-student` | Same subject. |
| Student | none | |

## Modules

Modules: student-pick-up, student-pick-up-person, student-pick-up-request, student-pick-up-setting. Prefix `student-pick-up*` in the catalog brief is not a closed inventory beyond these four folders.

MUST NOT: start `bbs/api` for auth. Encoded on [identity.md](identity.md).

No encoded math in the scattered notes.

[Wiki home](README.md)
