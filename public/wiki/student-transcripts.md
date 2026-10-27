# Student transcripts

Primary 6 transcript PDF from `StudentGrade`. This is not a `Report` row and not a `ReportTypeEnum` member.

See also:

- [reports.md](reports.md)
- [certificates.md](certificates.md)
- [gradebooks.md](gradebooks.md)

## No entity folder

`api_nest/src/modules/student-transcript/` has controller, service, module, and dto only. No `entities/` folder.

## Generate

`StudentTranscriptService.generateTranscript`. Loads `MasterLevel` where `name === 'Primary 6'`. Student's `currentClassYear.masterLevel.id` must match. Other levels throw.

Grades come from `StudentGrade` for the current class year's banded `SubjectYear`s. Display grade prefers `adjustmentFinalGrade || finalGrade`. `hasValidGrade` is `!!(finalGrade && finalGrade > 0)`. Subjects without a valid grade are dropped.

## Templates

`generateTranscriptPDF` in `api_nest/src/helpers/transcript/transcript-pdf.helper.ts`.

| Branch name | Template |
| --- | --- |
| `Pantai Indah Kapuk` | `student-transcript-pik.hbs` |
| other | `student-transcript.hbs` |

## ACL and routes

Controller `/v1/studentTranscripts`. Subject `ModulesTypeEnum.STUDENT_TRANSCRIPT`.

| Method | Path | Action |
| --- | --- | --- |
| POST | `/v1/studentTranscripts/generate/:studentId` | CREATE |
| POST | `/v1/studentTranscripts/generate-pdf/:studentId` | CREATE |
| POST | `/v1/studentTranscripts/generate-bulk-pdfs` | CREATE |
| GET | `/v1/studentTranscripts/grades/bulk` | READ |
| GET | `/v1/studentTranscripts/grades/student/:studentId` | READ |
| PUT | `/v1/studentTranscripts/grades/bulk` | UPDATE |

Admin SPA `/student-transcripts`.

[Wiki home](README.md)
