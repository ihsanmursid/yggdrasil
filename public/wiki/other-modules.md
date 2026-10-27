# Other modules

Live api_nest modules that have no dedicated product note. Treat as live code, not as specified product math.

See also:

- [identity.md](identity.md)
- [academic-structure.md](academic-structure.md)
- [systems.md](systems.md)
- [certificates.md](certificates.md)
- [report-types.md](report-types.md)

Modules live under `api_nest/src/modules/`. Group titles on catalog pages are not an ACL. A name with * is a prefix, not a complete inventory.

`teacher-leave` is a live module as of 2026-09-30: `api_nest/src/modules/teacher-leave/` with controller path `leaves` (`leave.controller.ts:25`). The 2026-09-02 note that said the folder does not exist is outdated — the module arrived with a later pull. Treat it as live code with no product note yet.

## Cluster

Not covered by a dedicated note. Cluster only: analytic; file, media-storage; mailer, notification; question, student-answer; language-spoken; general-purpose; external-service-integration; master-account; master-document-template; master-subject-coordinator; bmt-week; marking-type; total-mark; grading-guide; weighted-subject-level; programme-academic-department.

`grading-guide` drives the LO rewrite on [report-types.md](report-types.md): if `REPORT_TERM` or `REPORT_SEMESTER` and `GradingGuide.gradingGuideType === LEARNING_OUTCOME`, rewrite to `LEARNING_OUTCOME` before the helper switch.

[Wiki home](README.md)
