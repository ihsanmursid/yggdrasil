# SVE grade input

Teacher records per-question answers against item-analysis keys. Totals are computed in the SPA. The nest create and update paths store the payload as sent.

See also:

- [sve.md](sve.md)
- [sve-item-analysis.md](sve-item-analysis.md)
- [sve-files.md](sve-files.md)

## Store

Entity `SveStudentGrade`. Unique lookup on bulk: `(studentId, sveExamTypeId, classroomId)`. No `Unique()` decorator. No status column. No submit versus draft. Fields include `answers` jsonb, `totalScore`, `totalWeight`, `percentage`, plus optional programme, academic year, master level, subject, master exam type, class year.

`answers[]`: `questionNumber`, `answer`, `score`, `mark`.

API `/v1/sveStudentGrades`: GET, GET `:id`, POST, PUT `:id`, DELETE `:id`, POST `bulk`. No `@CheckPermissions` on the controller.

`bulkUpdate` upserts by that triple. `create` and `update` persist DTO fields. Service method `calculateScore()` exists and is not called from those paths.

## Teacher scoring (SPA)

`bbs/client-teacher/src/views/sve/SveGradeInput.jsx`. Routes: `/grade-input`, `/grade-input/:sveExamTypeId`, `/sves/:sveExamTypeId/grade-input`. No `requirePrincipalOrHod` meta.

For each key row:

- `MCQ_ABCD`: score is `keyAnswer.mark` if the cell equals `keyAnswer`, else 0. Cell is normalised to one of `A`..`E`.
- else (open-ended): score is `parseFloat(answer) || 0`. Empty cell is skipped for the running total.

`totalWeight` is the sum of key `mark` values. `percentage` is `(totalScore / totalWeight) * 100` when weight is greater than 0, else 0. Payload is POST create or PUT update per student. Autosave on blur when the student row is dirty and has any answer. No lock check.

## Who appears

Students come from `GET studentsV2` with `bandingsIds` taken from the class-year `SubjectYear` for the selected subject. Deduped by student id, sorted by `fullName`. Empty banding list yields no rows.

Classroom id on the grade row is `classYear.classroomId`. Filters cascade: programme, academic year, master level, subject, master exam type, exam paper (`sveExamTypeId`), class year.

## Who can submit

API: any authenticated caller that can hit `/v1/sveStudentGrades`. No role guard on that controller. Teacher portal exposes the routes with no principal or HOD meta. Admin has no grade-input route. Student has none. Nest does not check `SveDeadline.isLocked` or `SveExamType.lockDocument`.

[Wiki home](README.md)
