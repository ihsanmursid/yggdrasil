# Awardees

Awardees view types, eligibility, INNER JOIN drop-through, LOWER/UPPER/SUBJECT/PQP rules, and NONE rows.

See also:

- [primary-reports.md](primary-reports.md)
- [secondary-gradebook.md](secondary-gradebook.md)
- [open-questions.md](open-questions.md)
- [certificates.md](certificates.md)

From [view_student_awardees_rules.md](../view_student_awardees_rules.md) and [view_student_awardees.sql](../view_student_awardees.sql). Types: LOWER, UPPER, SUBJECT, PQP. One student can appear in more than one type.

## Eligibility

Eligibility (all required): `full_name` does not match `%sample%` (case-insensitive); `deleted_at IS NULL`; `active_status = '1'`; `student_status = '1'`.

INNER JOIN drop-through: student_report to student to class_year to programme to campus to master_level to classroom to academic_year to subject_year to subject to employee (homeroom) to banding_students_student to banding to employee (subject teacher). Missing banding or homeroom teacher drops the student from every award. Flag as a review item, not as invented policy. See [open-questions.md](open-questions.md).

Mark order: BEGINNING 1, DEVELOPING 2, COMPETENT 3, PROFICIENT 4. Other or NULL mark maps to NULL order. Terms <= 4. Latest term, then highest mark per indicator (`rank_lo_grade` then `ytd_lo_grade`). Soft-deleted `learning_indicator_grade` rows are out. Campus NULL on `learning_outcome_year` means all campuses.

EMSCBI: `s_category = '1'` collapsed to virtual subject EMSCBI (`s_id = 0`, no subject teacher). Category `'2'` kept per subject. Exclude PAL - PLAY AND LEARN.

## LOWER EMSCBI ML1

`ml_id = 1`:

| Award | Conditions |
| --- | --- |
| HIGH DISTINCTION | proficient >= 29 and competent 0-3 and beginning = 0 and developing = 0 |
| DISTINCTION | proficient 26-28 and competent 4-6 and beginning = 0 and developing = 0 |

## LOWER EMSCBI ML2

`ml_id = 2`:

| Award | Conditions |
| --- | --- |
| HIGH DISTINCTION | proficient >= 32 and competent 0-4 and beginning = 0 and developing = 0 |
| DISTINCTION | proficient 29-31 and competent 5-7 and beginning = 0 and developing = 0 |

First match wins. Other master levels yield NONE for these EMSCBI distinctions.

## LOWER subject-name awards

Category 2 in practice, keyed on `s_name`, not on category in the CASE: YOUNG ARTIST (`Art & Crafts`), FAITH HEROES (`Faith Builder`), YOUNG ATHLETE (`Physical Education`), YOUNG MUSICIAN (`Music`), CHARACTER HEROES (`Character First`), PELAJAR PANCASILA (`Pendidikan Pancasila dan Kewarganegaraan`). PE and Music use extra `lo_count` thresholds that differ between ML1 and ML2. See the source note for the exact PE and Music predicates. Flag hardcoded subject names as a review item. See [open-questions.md](open-questions.md).

## UPPER

`gold` = count of student-grade `award = '3'` (GOLD). `a_mark` = count of `grade_mark = 'A'`. Medal map: 1 BRONZE, 2 SILVER, 3 GOLD. Exact equality, not >=.

| Award | Conditions |
| --- | --- |
| HIGH DISTINCTION | gold = 6 and a_mark = 6 |
| DISTINCTION | (gold = 5 and a_mark = 6) or (gold = 6 and a_mark = 5) |
| MERIT | (gold = 5 and a_mark = 5) or (gold = 4 and a_mark = 6) or (gold = 6 and a_mark = 4) |
| NONE | otherwise |

## SUBJECT medals

BRONZE, SILVER, GOLD passthrough when `sg_award_name IS NOT NULL` and `s_category = '1'` and `s_name <> 'Project'`.

## PQP

POSITIVE ROLE MODEL when count of `evaluation_mark = 'EXCEEDING_EXPECTATIONS'` on `student_ftp_conduct_evaluation` equals 4. Else NONE. Exact equality.

NONE rows are returned. Consumer MUST filter `reward <> 'NONE'` if only actual awardees are wanted.

Portals: admin and report consumers of the view. Not a student write path.

[Wiki home](README.md)
