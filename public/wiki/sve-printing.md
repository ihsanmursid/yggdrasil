# SVE printing

Printing-request quantities. Branch requests plus exam-type documents become paper counts. Do not treat this table as a billing formula.

See also:

- [sve.md](sve.md)
- [cambridge.md](cambridge.md)

From [PRINTING_DETAIL_LOGIC.md](../PRINTING_DETAIL_LOGIC.md). Admin route: `/sve-printing-request`. Module: sve-printing-request. These tables lived on [cambridge.md](cambridge.md) and moved here without changing the numbers.

## Core counts

| Item | Formula in that note |
| --- | --- |
| Expert | 1 if sveExamType.expertId exists, else 0 |
| HOD | count of branches with paperCount > 0 (`totalBranches - branchesWithZeroPaperCount`) |
| LIB | same as HOD |
| Exam paper total | HOD + LIB + Expert + sum of (paperCount + extraPaperCount) |
| Exam paper master | question-paper pages (masterSvePaperTypeId === 5) + cover pages (masterSvePaperTypeId === 14) |
| Marking scheme total | HOD + LIB + Expert |
| Marking scheme master | MS pages (code MS, isBMT === false) + TOS pages (code TOS) |
| Teacher paper total | 8 * HOD |
| Answer sheet total | same as exam paper total |
| Insert total | same as exam paper total; INS and ICP combined in display |
| MCQ total | sum of branch MCQ counts; master 1; HOD, LIB, Expert 0 |

## Additional types in that note

| Item | Formula in that note |
| --- | --- |
| Answer sheet master | pages from document with code AS |
| Teacher paper master | pages from document with code TP |
| Insert master | pages from document with code INS or ICP |
| MCQ / MF19 master | always 1 |
| Other additional total | HOD + LIB + Expert + sum of branch counts |
| Other additional master | always 1 |

`buildBranchPaperTypes` per branch and exam type: paperCount, extraPaperCount, additionalPaperTypeCount (AS, TP, INS, ICP, MCQ, MF19, etc.).

[Wiki home](README.md)
