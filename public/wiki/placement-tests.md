# Placement tests

Placement test definitions, schedules, settings, and results. No invented scoring formulas.

See also:

- [student-admission.md](student-admission.md)
- [admissions.md](admissions.md)
- [academic-structure.md](academic-structure.md)
- [identity.md](identity.md)

## Admin routes

Admission nav item Placement Test points at `/placement-test-schedules`. Additional subjects on that nav item: `PLACEMENT_TEST`, `PLACEMENT_TEST_RESULT`, `PLACEMENT_TEST_SETTING`.

| Path | Name |
| --- | --- |
| `/placement-tests` | Placement Tests |
| `/placement-tests/add` | Add |
| `/placement-tests/:placementTestId` | Detail |
| `/placement-tests/:placementTestId/edit` | Edit |
| `/placement-test-results` | Results |
| `/placement-test-results/add` | Add/Exam |
| `/placement-test-results/edit/:studentAdmissionId` | Edit results |
| `/placement-test-schedules` | Schedules |
| `/placement-test-settings` | Settings |
| `/placement-test-settings/add` | Add setting |
| `/placement-test-settings/:ptSettingId` | Edit setting |

## Teacher routes

Grade nav: `/placement-test-results`, `/placement-test-results/add`. Subject `PLACEMENT_TEST_RESULT`.

## Modules

Modules: placement-test*.

A name with `*` is a prefix. Related: placement-test, placement-test-attempt, placement-test-result, placement-test-schedule, placement-test-setting, placement-test-subject.

API: `/v1/placementTests`.

No extra MUST scoring rules in the scattered notes. Do not invent placement scoring formulas.

[Wiki home](README.md)
