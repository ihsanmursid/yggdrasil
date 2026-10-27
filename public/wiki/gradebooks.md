# Gradebooks

Admin grade books and primary default weights. Sec/JC FYA math is not on this page.

See also:

- [secondary-gradebook.md](secondary-gradebook.md)
- [lo-settings.md](lo-settings.md)
- [grade-moderation.md](grade-moderation.md)
- [secondary-gpa.md](secondary-gpa.md)

## Admin

| Route | Notes |
| --- | --- |
| /grade-books | List |
| /grade-books/:subjectYearId | One subject year |
| /default-grade-weights | Primary default weights list |
| /default-grade-weights/:masterLevelId | Form for one master level |

Teacher: `/gradebook`, `/gradebook/:subjectYearId`. Secondary teacher gradebook is `/secondary-gradebook` — [secondary-gradebook.md](secondary-gradebook.md).

Modules here: grade-weight, grade, gradebook-exam, gradebook-table, student-grade. Secondary and Cambridge modules stay on their pages.

## Primary SA weights

Entity `GradeWeight` (`api_nest/src/modules/grade-weight/entities/grade-weight.entity.ts`): cat1, cat2, cat3, cat4, mye, fye, sa1, sa2, gold, silver, bronze. Form: `bbs/client/src/views/defaultGradeWeights/DefaultGradeWeightForm.jsx`. Schema: `bbs/client/src/views/gradeWeights/gradeWeightSchema.js`.

Semester 1 fields: CAT1, CAT2. Semester 2 fields: CAT3, CAT4. MYE and FYE are separate. SA1 and SA2 are read-only on the form.

    SA1 = CAT1 + CAT2 + MYE
    SA2 = CAT3 + CAT4 + FYE

Schema: SA1 + SA2 must equal 100. Each CAT/MYE/FYE field 0–100. Medal fields min -1. When none of bronze, silver, gold is -1, bronze < silver < gold.

Copy to other levels: CopyGradeWeight on that form (save first).

JC ids 15–17 still appear on the primary default-grade-weights list (`DefaultGradeWeights.jsx` filters 7–14 only). Secondary UI lists 7–17. Flag: [secondary-gradebook.md](secondary-gradebook.md), [open-questions.md](open-questions.md).

Do not copy Sec/JC FYA or term-component percentages onto this page. Those numbers: [secondary-gradebook.md](secondary-gradebook.md).

[Wiki home](README.md)
