# SVE lock

Two lock stores. The one that blocks assign and timetable edits is `SveDeadline.isLocked` plus an overdue date. The admin `/sve-lock` screen writes a different path that live nest does not expose.

See also:

- [sve.md](sve.md)
- [sve-timetable.md](sve-timetable.md)
- [sve-files.md](sve-files.md)
- [sve-printing.md](sve-printing.md)
- [open-questions.md](open-questions.md)

## Deadline lock (live)

Entity `SveDeadline`. Columns: `isLocked` boolean default true, `lockedAt` timestamptz nullable. Also `assignDeadlineAt`, `uploadingDeadlineAt`, `printRequestDeadlineAt`, `timetableDeadlineAt`. Unique create key: academic year, master programme, master SVE exam type, overlapping `masterLevelsIds` (`ArrayOverlap`). Programme initial `S` also includes JC when listing.

Toggle: `PUT /v1/sveDeadlines/:id/lockUnlock`. ACL `SVE_DEADLINE` UPDATE. `lockUnlockDeadline()` flips `isLocked`. When turning lock on, sets `lockedAt = new Date()`. Unlock does not clear `lockedAt`.

Admin `/sve-deadline` button is `BBSCan I={UPDATE} a={SVE_DEADLINE}`. Confirm copy: lock or unlock this deadline.

Nest services do not read `isLocked` to reject writes. Blocking is client-only:

| Screen | Condition | What it disables |
| --- | --- | --- |
| `SveAssignTeacherModal.jsx` | `isLocked && moment(assignDeadlineAt).isBefore(moment())` | Setter, vetter, expert fields and save |
| `SveExamTimetableModal.jsx` | `isLocked && moment(timetableDeadlineAt).isBefore(moment())` | Exam date and time fields and save |
| `SvePrintingRequest.jsx` | `moment().isAfter(printRequestDeadlineAt)` when there are zero printing rows | Create. Sync stays allowed. `isLocked` is fetched and unused on this gate |

Unlocked or not-yet-due: the forms stay editable. Backend `PUT /v1/sveExamTypes/:id` still accepts setter and timetable fields with no `isLocked` check.

## Exam-type timestamps (live store, no live block)

`SveExamType.lockDocument` and `SveExamType.lockAssignee` are `timestamptz` nullable. `PUT /v1/sveExamTypes/:id` writes them when the incoming value is truthy and different. ACL on that PUT: `SVE_EXAM_TYPE` UPDATE or `SVE_EXAM_TIMETABLE` UPDATE.

No nest service compares those dates to now to block assign, upload, or grade input. Teacher `SveDetail.jsx` does not read them.

## Admin `/sve-lock` screen

`bbs/client/src/views/sves/lock/SveLock.jsx`. Filter: `academicYearId`, `campusType` default `PRIMARY` (Primary or Secondary). Set button: `BBSCan I={UPDATE} a={SVE_LOCK}`. Save sends unix seconds at 23:59:59 for `lockAssignee` and `lockDocument`, keyed by `academicYearId`, `examType`, `campusType`.

Client actions: `GET /sves/component/lock`, `PUT /sves/component/lock` (`bbs/client/src/actions/api/sve.js`).

Those paths exist on retired `bbs/api/src/routers/sveRouter.ts` (ACL `SVE_LOCK` READ and UPDATE). They do not exist on `api_nest` `sve.controller.ts` (`path: 'sves'`). Live API is api_nest. See [open-questions.md](open-questions.md). Retired Express wrote the timestamps onto `sve_component` rows for the academic year, exam type, and campus type (Primary School vs Secondary School plus Junior College).

## Who can lock

Deadline toggle: admin with `SVE_DEADLINE` UPDATE. Exam-type timestamps: admin with `SVE_EXAM_TYPE` UPDATE (or `SVE_EXAM_TIMETABLE` UPDATE on the same PUT). `/sve-lock` UI: `SVE_LOCK` UPDATE, against a nest path that is missing.

Teacher cannot toggle `isLocked`. Student cannot.

[Wiki home](README.md)
