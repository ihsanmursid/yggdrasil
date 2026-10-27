# SVE item analysis

Key answers per question, import guards, and analytics views that grade items with FI and DI.

See also:

- [sve.md](sve.md)
- [sve-grade-input.md](sve-grade-input.md)
- [analytics.md](analytics.md)
- [open-questions.md](open-questions.md)

## Keys

Entity `SveItemAnalysisAnswer`: `questionNumber`, `questionType` (`MCQ_ABCD` or `OPEN_ENDED`), `keyAnswer`, `mark`, `sveExamTypeId`, `masterSvePaperTypeId`. Unique live check: one question number per exam type and paper type (`assertQuestionNumberIsUnique`). Soft-delete on remove.

API `/v1/sveItemAnalysisAnswers`. Create, import, find, update, delete: no `@CheckPermissions`. `GET reports` uses `ItemAnalysisAnalyticsAccessGuard`.

Teacher keys UI: `/sves/:sveExamTypeId/item-analysis`. Tabs by paper-type code: FQP or QP (Question Paper), MS (Marking Scheme), AS or ANS (Answer Sheet), TOS. Create form: `MAX_MARK = 9`. MCQ options `A`..`E`.

## Import

`POST /v1/sveItemAnalysisAnswers/import`. Row numbers in errors start at 2.

MUST fail a row when:

- `questionNumber` is not an integer `>= 1`
- `keyAnswer` is blank after trim
- `mark` is missing, NaN, `< 0`, or `> 9`
- type is `MCQ_ABCD` and trimmed upper key is not in `A`, `B`, `C`, `D`, `E`
- the same question number appears twice in the file

If any live row already exists for that exam type and paper type and `replaceExisting` is false: `SveItemAnalysisAnswersAlreadyExistError`. When replace is true, existing rows are soft-removed then inserted. MCQ keys are stored uppercased.

## Analytics access

`GET /v1/sveItemAnalysisAnswers/reports`. Guard allows the caller if CASL can READ `SVE_ITEM_ANALYSIS_ANALYTICS`, or `checkIfPrincipal`, or `checkIfHoD` with `headDepartments.length > 0`. Else false.

Teacher routes `/item-analysis-analytics` and `/item-analysis-analytics/:sveExamTypeId`: meta `requirePrincipalOrHod: true`. Admin `/sve-item-analysis-analytics`: SPA subject `SVE_ITEM_ANALYSIS_ANALYTICS`. [analytics.md](analytics.md).

`reportScope`: `all` (default), `campus`, `classroom`. Views: `view_sve_item_analysis`, `view_sve_item_analysis_campus`, `view_sve_item_analysis_classroom`. `rowGroup` filter: `ALL`, `UPPER`, `LOWER`. Classroom scope also filters `classroomId` and `classYearId`.

## Encoded FI, DI, grade

From `VIEW_SVE_ITEM_ANALYSIS_EXPRESSION`. Live grades only (`deleted_at IS NULL`). Group size: `round(count(*) over exam type * 0.27)`. UPPER: `rank_high <= group_size` (score desc, then `student_id`). LOWER: `rank_low <= group_size` (score asc, then `student_id`). Else MIDDLE. Empty answers are dropped.

MCQ FI (ALL): `total_correct / total_student_answer`. Open-ended ALL FI: `all_total_correct / all_total_incorrect`, where incorrect on ALL is `max(item_mark)`.

MCQ DI: upper FI minus lower FI. Open-ended DI: `(upper_total_correct - lower_total_correct) / coalesce(all_total_incorrect, total_item_mark)`.

Grade is set on `row_group = ALL` only:

| When | Grade |
| --- | --- |
| `di < 0` | F |
| `di = 0` | E |
| `all_fi > 0.8` | A |
| `all_fi > 0.3` | B |
| `all_fi > 0.2` | C |
| else | D |

SPA labels: A Easy, B Average, C Difficult, D Very Difficult, E Poor Item, F Invalid Item (`itemAnalysisGradeMeta.js`).

The view counts MCQ options A to D only. Import and grade input allow E. Flag: [open-questions.md](open-questions.md).

[Wiki home](README.md)
