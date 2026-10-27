# SVE

School-based Validated Examination. Index of the object model and encoded child pages. Printing counts stay on the printing child.

See also:

- [sve-lock.md](sve-lock.md)
- [sve-timetable.md](sve-timetable.md)
- [sve-grade-input.md](sve-grade-input.md)
- [sve-item-analysis.md](sve-item-analysis.md)
- [sve-files.md](sve-files.md)
- [sve-printing.md](sve-printing.md)
- [thresholds.md](thresholds.md)
- [cambridge.md](cambridge.md)
- [analytics.md](analytics.md)

## Object model

| Object | What it is |
| --- | --- |
| `Sve` | One component instance for `(subject, academicYear, masterLevel, masterSveComponent)`. Extra paper types sit on join table `sve_additional_paper`. |
| `SveExamType` | That `Sve` plus one `MasterSveExamType`. Holds setter, vetter, expert, exam date and time, `lockDocument`, `lockAssignee`. |
| `SveDeadline` | One row for academic year, programme, master exam type, and `masterLevelsIds`. Flags `isLocked` (default true) and `lockedAt`. |
| `SveDocument` | A file on one exam type. Status enum. History rows. Auto-send date. [sve-files.md](sve-files.md) |
| `SveStudentGrade` | Answers JSON plus totals for `(studentId, sveExamTypeId, classroomId)`. [sve-grade-input.md](sve-grade-input.md) |
| `SveItemAnalysisAnswer` | Key answer for one `(sveExamTypeId, masterSvePaperTypeId, questionNumber)`. [sve-item-analysis.md](sve-item-analysis.md) |
| `SveExamTimetableSession` | Named session slot with `timeStart`, `timeEnd`, `number`, `group`. [sve-timetable.md](sve-timetable.md) |
| `SveCoverPage` and `SveCoverTemplate` | Cover HTML and lexical state. [sve-timetable.md](sve-timetable.md) |
| `SveDispatchesBox` | Dispatch box. ACL `SVE_BOX`. PUT `:id/assign-unassign`. No box or label math on this catalog. |
| Printing request | Branch paper counts. [sve-printing.md](sve-printing.md) |

Lock that actually blocks assign and timetable edits is `SveDeadline.isLocked` plus an overdue deadline date. [sve-lock.md](sve-lock.md). Cambridge letter math is not here: [thresholds.md](thresholds.md), [cambridge.md](cambridge.md).

Modules `sve*`: sve, sve-cover-page, sve-cover-template, sve-deadline, sve-dispatches-box, sve-document, sve-errata-list, sve-exam-timetable-note, sve-exam-timetable-report, sve-exam-timetable-session, sve-exam-type, sve-exam-type-history, sve-item-analysis, sve-printing-request, sve-report, sve-student-grade. Also master-sve-component, master-sve-exam-type, master-sve-paper-envelope, master-sve-paper-type, bmt-week. A name with `*` is a prefix, not a complete inventory.

Teacher list: HOD loads `GET /v1/sveExamTypes` filtered by HOD master subjects. Non-HOD loads `GET /v1/sveExamTypes/byUser`, which keeps rows where the caller is setter or vetter or expert unless `bySubjectTeacher` is set (then subject-year teacher). `SveExamTypeUserDto` sets `isSetter`, `isVetter`, `isExpert`.

Student does not configure SVE.

## Admin

From `bbs/client/src/routes.js`:

| Route | Notes |
| --- | --- |
| /sve-list | List. Also /sve-list/add, /sve-list/:sveExamTypeId |
| /sve-component | Components. Also /sve-component/add, /sve-component/:subjectId/:masterLevelId/:academicYearId/edit |
| /sve-deadline | Deadlines. Lock toggle: [sve-lock.md](sve-lock.md) |
| /sve-exam-timetable | Timetable. Also /sve-exam-timetable/:sveExamTimetableId/edit. [sve-timetable.md](sve-timetable.md) |
| /sve-cover-template | Cover templates. Also /sve-cover-template/add, /sve-cover-template/:sveCoverTemplateId/edit |
| /sve-cover-page | Cover pages. Also /sve-cover-page/:sveCoverPageId/edit |
| /sve-report | Reports |
| /sve-submission-summary | Submission summary |
| /sve-label | Labels. No encoded label math found. |
| /sve-errata-list | Errata |
| /sve-bmt-week | BMT week |
| /sve-box | Boxes. Also /sve-box/add, /sve-box/:sveBoxId/detail. ACL `SVE_BOX`. No encoded box math found. |
| /sve-lock | Date UI for `lockAssignee` and `lockDocument`. Live nest path is missing. [sve-lock.md](sve-lock.md) |
| /sve-item-analysis-analytics | Item analysis analytics. [sve-item-analysis.md](sve-item-analysis.md) |
| /sve-printing-request | Printing. Formulas: [sve-printing.md](sve-printing.md) |

`/sve-cover-*` in the nav is `/sve-cover-template` and `/sve-cover-page`.

## Teacher

From `bbs/client-teacher/src/routes.js`:

| Route | Notes |
| --- | --- |
| /sves | List. Also /sves/:sveExamTypeId |
| /grade-input | Grade input. Also /grade-input/:sveExamTypeId and /sves/:sveExamTypeId/grade-input. [sve-grade-input.md](sve-grade-input.md) |
| /sves/:sveExamTypeId/item-analysis | Per-exam keys. [sve-item-analysis.md](sve-item-analysis.md) |
| /item-analysis-analytics | Analytics. Also /item-analysis-analytics/:sveExamTypeId. Route meta `requirePrincipalOrHod: true` |
| /bmt-files | BMT files. Also /bmt-files/:sveExamTypeId. [sve-files.md](sve-files.md) |
| /exam-supporting-files | Supporting files. Also /exam-supporting-files/:sveExamTypeId |
| /sves-past-paper | Past paper. Also /sves-past-paper/:sveExamTypeId |

View `SveFiles.jsx` exists under teacher `views/sve/files` and links to `/sve-files/:id`. That path is not in `client-teacher/src/routes.js`. UNKNOWN whether it is mounted elsewhere.

[Wiki home](README.md)
