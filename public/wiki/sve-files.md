# SVE files

Exam documents, statuses, auto-send, and teacher download lists for BMT, supporting files, and past paper.

See also:

- [sve.md](sve.md)
- [sve-lock.md](sve-lock.md)
- [sve-timetable.md](sve-timetable.md)
- [sve-printing.md](sve-printing.md)

Printing paper counts are not this page: [sve-printing.md](sve-printing.md).

## Document

Entity `SveDocument`. Status `SveDocumentStatusEnum`: `CREATED = 1`, `UPDATED`, `COMMENTED`, `REVISION_UPLOAD`, `APPROVED_DRAFT`, `APPROVED_FBP`. Default `CREATED`. Also `filePage` default 1, `uploadedBy` jsonb, `autoSendAt`, `isSent` default false.

API `/v1/sveDocuments`: POST, GET, PUT `:id`. No `@CheckPermissions`. `remove()` returns the string `This action removes a #${id} sveDocument` and does not delete.

Create requires a live `File` and `MasterSvePaperType`. Status is `SveDocumentStatusEnum[options.status]`. Each create or update writes `SveDocumentHistory`.

When status becomes `APPROVED_FBP`, the file `originFileName` is rewritten to `name_FBP.ext`.

## Auto-send

If `shouldSendEmail` and an exam reference date exists: send date is that date minus 2 days. BMT: `AcademicYearWeek.startDate` from `bmtWeek.tempAcademicYearWeekId || bmtWeek.academicYearWeekId`. Else `sveExamType.examDate`. Today on or after send date: enqueue `SVE_DOCUMENT_PROCESS`. Else store `autoSendAt`.

Cron `0 0 * * *` (00:00 UTC, 07:00 WIB): find `autoSendAt <= today`, `isSent = false`, status `APPROVED_FBP`, enqueue the same process.

BMT reminder cron `0 23 * * 4` (23:00 UTC Thursday, 06:00 WIB Friday): exam types on BMT weeks two weeks ahead whose paper type id 5 is missing or not `APPROVED_FBP`. Recipients: setter and vetter `emailBbs`.

## Teacher editability

`SveDetail.jsx` `isFileEditable()`. Role key is `isSetter` `isVetter` `isExpert` as three bits. Setter-only (`100`) is false. Any vetter or expert bit is true, then:

- status `APPROVED_DRAFT` or `APPROVED_FBP` or `REVISION_UPLOAD`: non-BMT expert may edit; BMT vetter may edit
- else only `CREATED`, `COMMENTED`, or `UPDATED` stay editable

Deadline is loaded (`uploadingDeadlineAt`, `masterLevelsIds`) and passed as `sveDeadline`. File-edit map above does not test `isLocked`.

## BMT download

Teacher `/bmt-files`, `/bmt-files/:sveExamTypeId`. Default `masterSveExamTypeId` `"3"`. List: `GET /v1/sveExamTypes/bmtOnly` (`getBMTSveExamTypesByUser`). Query `substractBy: 7`: academic-year weeks where today is on or after `startDate - 7 days` and on or before `endDate`. HOD: `masterSubjectsIds` from HOD departments. Non-HOD: `bySubjectTeacher: true` (subject-year teacher).

## Supporting files

Teacher `/exam-supporting-files`, `/exam-supporting-files/:sveExamTypeId`. Default `masterSveExamTypeId` `"1"`. HOD: `GET /v1/sveExamTypes` with `masterSubjectsIds`. Non-HOD: `GET /v1/sveExamTypes/byUser` (setter or vetter or expert). Audio paper: code `AUD` or name contains `audio`.

`findAllByUser` `substractBy`: `CURRENT_DATE >= (examDate - INTERVAL '<n> days')`. `excludeBMT`: `masterSveExamType.isBMT = false`.

## Past paper

Teacher `/sves-past-paper`, `/sves-past-paper/:sveExamTypeId`. On load, academic year is forced to `currentAcademicYear.id - 1`. Year picker keeps only `ay.id < currentAcademicYear.id`. List is `GET /v1/sveExamTypes` (not byUser). No extra status filter in the list component.

[Wiki home](README.md)
