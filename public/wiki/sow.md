# Scheme of work

Scheme of work, lessons, materials, topics, and assignments. Admin owns `/sow`. Teacher builds resources. Student reads subjects and assignments.

See also:

- [subject-in-year.md](subject-in-year.md)
- [file-sharing.md](file-sharing.md)
- [academic-structure.md](academic-structure.md)
- [classrooms.md](classrooms.md)
- [gradebooks.md](gradebooks.md)

## Routes

| Portal | Path | Notes |
| --- | --- | --- |
| Admin | `/sow` | Nav: SOW / List & Component. `SUBJECT_MODULES.SOW`. Also `/sow/add`, `/sow/:sowId`, `/sow/:sowId/edit`. |
| Teacher | `/sows`, `/sows/:sowId` | Nav: Scheme of Works. |
| Teacher | `/resources` | Lesson builder. Nested `:subjectId`, `:chapterId`, `lessons/:lessonId`, `assignments/:assignmentId`, `/resources/assign`. `SUBJECT_MODULES.LESSON_BUILDER`. |
| Teacher | `/assignments` | Assignment list and student submission. |
| Student | `/subjects` | Topic and lesson: `/subjects/:subjectYearId/:topicId`, `.../:lessonId`. |
| Student | `/subjectLibrary` | Library read. Nested `:subjectId`, `:chapterId`. |
| Student | `/assignments`, `/assignments/:studentAssignmentId` | |

## Modules

Modules: sow, lesson, lesson-plan, material, topic, assignment, assign-assignment, assign-lesson, assign-topic, student-assignment, student-lesson. A name with `*` in the catalog brief means the assign- prefix, not a closed inventory.

No encoded math in the scattered notes.

[Wiki home](README.md)
