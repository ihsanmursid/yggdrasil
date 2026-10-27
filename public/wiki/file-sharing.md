# File sharing

Academic-department files and subject files. Admin and teacher share the same two paths. Student has no file-sharing nav.

See also:

- [sow.md](sow.md)
- [academic-structure.md](academic-structure.md)
- [identity.md](identity.md)
- [master-data.md](master-data.md)
- [subject-in-year.md](subject-in-year.md)

## Routes

| Portal | Path | Notes |
| --- | --- | --- |
| Admin | `/file-sharing/academic-department-files` | `SUBJECT_MODULES.ACADEMIC_DEPARTMENT_FILE`. Also add, `:adfId`, edit. |
| Admin | `/file-sharing/subject-files` | `SUBJECT_MODULES.SUBJECT_FILE`. Also add, `:sfId`, edit. |
| Teacher | `/file-sharing/academic-department-files` | Details `:adfId`. |
| Teacher | `/file-sharing/subject-files` | Details `:sfId`. |
| Student | none | Student subject library is `/subjectLibrary` on [sow.md](sow.md). |

## Modules

Modules: academic-department-file, subject-file, subject-library.

No encoded math in the scattered notes.

[Wiki home](README.md)
