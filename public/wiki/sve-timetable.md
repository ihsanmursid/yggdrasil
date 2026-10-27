# SVE timetable

Exam-type date and time, session slots, cover pages, and the deadline that locks timetable edits.

See also:

- [sve.md](sve.md)
- [sve-lock.md](sve-lock.md)
- [sve-files.md](sve-files.md)
- [sve-printing.md](sve-printing.md)

## Exam type fields

On `SveExamType`: `examDate`, `examDateTo`, `examTimeFrom`, `examTimeTo` (`timetz`), `examDuration` (minutes), `week`. BMT uses `BmtWeek` and `AcademicYearWeek` instead of `examDate` on teacher detail.

Admin `/sve-exam-timetable`. Update: `PUT /v1/sveExamTypes/:id`. ACL `SVE_EXAM_TYPE` UPDATE or `SVE_EXAM_TIMETABLE` UPDATE. Times go through `convertedTimeTz`.

Client lock: `isLocked && timetableDeadlineAt` is before now. Nest does not enforce it. [sve-lock.md](sve-lock.md).

Teacher supporting-file cards format date and time in `examSupportingFileFormatters.js`: `examDate` as `LL`, times as `HH:mm` from `HH:mm:ssZ`.

## Sessions

Entity `SveExamTimetableSession`: `name`, `number` default 1, `group` default 1, `timeStart`, `timeEnd`, plus `masterSveExamTypeId`, `masterLevelId`, `academicYearId`, `masterProgrammeId`.

API ` /v1/sveExamTimetableSession`. GET and POST ACL `SVE_SESSION_TIMETABLE` READ or CREATE. POST bulk: for one academic year, master exam type, and programme, insert rows without id, update rows with id, soft-delete existing ids missing from the payload.

## Notes and schedule report

`/v1/sveExamTimetableNotes`: GET, POST, POST bulk, DELETE. ACL `SVE_NOTE_TIMETABLE`.

`GET /v1/sveExamTimetableReports/schedule`: no `@CheckPermissions` on the controller.

Admin list GET `/v1/sveExamTypes` also accepts READ on `SVE_EXAM_TIMETABLE` or `COMMENT_TIMETABLE`.

## Cover

`SveCoverPage`: academic year, programme, optional template, optional `sveExamTypeId`, `html`, `lexicalState`. `/v1/sveCoverPages`. ACL `SVE_COMPONENT` on create, bulk, GET, GET previous, GET one, DELETE, bulk remove. PUT `:id` has no `@CheckPermissions`.

Bulk create walks exam types for that year and programme. Template match: `MasterDocumentTemplate.subject` in the set of `masterSveExamType.name`, same `masterProgrammeId`. `totalPages` is the sum of `sveDocument.filePage` on that exam type. Do not treat that sum as printing-request math. Printing: [sve-printing.md](sve-printing.md).

`SveCoverTemplate` `/v1/sveCoverTemplates`: create, update, list, sync, `addCoverTemplate`, `getCountSyncCoverTemplate`, `GET generateCoverPage`. ACL `SVE_COMPONENT`.

Admin routes: `/sve-cover-template`, `/sve-cover-page`. Teacher `SveDetail.jsx` can open a cover-page editor.

[Wiki home](README.md)
