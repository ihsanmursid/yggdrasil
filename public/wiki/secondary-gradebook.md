# Secondary gradebook

FYA formula, Sec1-3 vs Sec4-JC component weights, DCA exclusion, GRADEBOOK_SETTINGS, and JC still on the primary list.

## Children

- [secondary-gpa.md](secondary-gpa.md) — /secondary-gpa-gs, /secondary-gpa-su
- [gradebooks.md](gradebooks.md) — /grade-books, /default-grade-weights, primary SA weights

See also:

- [cambridge.md](cambridge.md)
- [grade-moderation.md](grade-moderation.md)
- [academic-structure.md](academic-structure.md)
- [open-questions.md](open-questions.md)
- [certificates.md](certificates.md)

From [SECONDARY_GRADEBOOK.md](../SECONDARY_GRADEBOOK.md). Admin settings also described in [Secondary_Grade_Weights_Feature.md](../docs/Secondary_Grade_Weights_Feature.md). Where those two files disagree on versioning or extra fields, flag and read the entity. See [open-questions.md](open-questions.md).

## Formula

    CA1 = weighted T1 + T2
    CA2 = weighted T3 + T4
    FYA = CA1 * ca1% + MYE * mye% + CA2 * ca2% + FYE * fye%

Default FYA weights: CA1 20, MYE 25, CA2 20, FYE 35. Sum MUST be 100. Each weight 0-100. Medal fields: -1 = disabled, else 0-100. Frontend also orders bronze < silver < gold when none of them is -1.

## Master levels

Master levels 7-17. Tier Sec1-3 (ids 7-12) vs Sec4-JC (13-17):

| ID | Level | Tier |
| --- | --- | --- |
| 7 | Secondary 1 Accelerated | Sec1-3 |
| 8 | Secondary 1 | Sec1-3 |
| 9 | Secondary 2 Accelerated | Sec1-3 |
| 10 | Secondary 2 | Sec1-3 |
| 11 | Secondary 3 Accelerated | Sec1-3 |
| 12 | Secondary 3 | Sec1-3 |
| 13 | Secondary 4 Accelerated | Sec4-JC |
| 14 | Secondary 4 | Sec4-JC |
| 15 | JC Bridging | Sec4-JC |
| 16 | Junior College 1 | Sec4-JC |
| 17 | Junior College 2 | Sec4-JC |

## Tier Sec1-3 components

Components: TT, BMT, DCA, AA.

| Term | Component | Weight |
| --- | --- | --- |
| T1 | Test 1 (TT) | 18.75% |
| T1 | BMT (BMT) | 18.75% |
| T1 | DCA T1 (DCA) | 12.5% |
| T2 | Test 1 (TT) | 18.75% |
| T2 | Test 2 (TT) | 18.75% |
| T2 | DCA T2 (DCA) | 12.5% |
| T3 | Test 1 (TT) | 25% |
| T3 | BMT (BMT) | 25% |
| T3 | DCA T3 (DCA) | 12.5% |
| T4 | AA 1 (AA) | 25% |
| T4 | DCA T4 (DCA) | 12.5% |

## Tier Sec4-JC

| Term | Component | Weight |
| --- | --- | --- |
| T1 | Test 1 (TT) | 25% |
| T1 | BMT (BMT) | 25% |
| T1 | DCA T1 (DCA) | 12.5% |
| T2 | Test 1 (TT) | 25% |
| T2 | DCA T2 (DCA) | 12.5% |
| T3 | Test 1 (TT) | 25% |
| T3 | BMT (BMT) | 25% |
| T3 | DCA T3 (DCA) | 12.5% |
| T4 | AA 1 (AA) | 25% |
| T4 | DCA T4 (DCA) | 12.5% |

DCA exam type is excluded from CA1 and CA2 until the DCA module is live. The DCA cell can still appear in the gradebook table. `GradeExamTypeEnum.AA = 14`. Helpers: `api_nest/src/helpers/default-gradebook-table.helpers.ts` (`isSecondarySec1To3`, `isSecondarySec4ToJC`).

## Settings API

Module: secondary-grade-weight. Entity unique (masterLevelId, subjectId). subjectId NULL is the level default. SQL NULL != NULL, so TypeORM @Unique does not enforce the default row. Service checkDuplicate() with IsNull() enforces it. Duplicate pair returns HTTP 409. Non-secondary masterLevelId returns 400.

Permission: GRADEBOOK_SETTINGS. Admin routes: /secondary-grade-weights, /secondary-grade-weights/:masterLevelId. Files: bbs/client/src/views/secondaryGradeWeights/.

| Method | Path | Action |
| --- | --- | --- |
| POST | /v1/secondaryGradeWeights | CREATE |
| GET | /v1/secondaryGradeWeights | READ, fallback to level default |
| GET | /v1/secondaryGradeWeights/:id | READ |
| PUT | /v1/secondaryGradeWeights/:id | UPDATE |
| DELETE | /v1/secondaryGradeWeights/:id | soft-delete |

`syncMasterLevels()` on primary grade-weight no longer maps ids 7-14. JC ids 15-17 still appear on the primary default-grade-weights list (`DefaultGradeWeights.jsx` filters 7-14 only). Flag that as a split. Secondary UI lists 7-17. See [open-questions.md](open-questions.md).

Related modules: secondary-grade, student-secondary-grade, grade-weight, grade, grade-dca, gradebook-exam, gradebook-table, student-grade, grade-moderation, grade-moderation-fye-mye, secondary-gpa-grading-scale, secondary-gpa-subject-unit.

Teacher portal has gradebook, secondary-gradebook, cambridge-gradebook, dca. Admin also has /default-grade-weights. Primary SA weights and /grade-books: [gradebooks.md](gradebooks.md). GPA scale/units: [secondary-gpa.md](secondary-gpa.md). Moderation: [grade-moderation.md](grade-moderation.md).

[Secondary_Grade_Weights_Feature.md](../docs/Secondary_Grade_Weights_Feature.md) adds academic-year versioning and term-component CRUD as design. [SECONDARY_GRADEBOOK.md](../SECONDARY_GRADEBOOK.md) does not. Flag if the entity does not match the longer doc. See [open-questions.md](open-questions.md).

[Wiki home](README.md)
