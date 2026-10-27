# Sources

Source notes the catalog was drawn from, as relative links. Paths are local, not git.

See also:

- [README.md](README.md)
- [systems.md](systems.md)
- [cambridge.md](cambridge.md)
- [attendance.md](attendance.md)
- [open-questions.md](open-questions.md)

Drawn from these files under ~/Work/klabs/binabangsa and docs/.

## Root notes

- [ATTENDANCE_REQUIREMENTS_COMPLIANCE.md](../ATTENDANCE_REQUIREMENTS_COMPLIANCE.md)
- [CAMBRIDGE_COMPONENT_MODEL.md](../CAMBRIDGE_COMPONENT_MODEL.md)
- [CAMBRIDGE_GRADING.md](../CAMBRIDGE_GRADING.md)
- [CAMBRIDGE_GRADING_CALCULATION_SYSTEM.md](../CAMBRIDGE_GRADING_CALCULATION_SYSTEM.md)
- [CAMBRIDGE_GRADING_USER_STORIES.md](../CAMBRIDGE_GRADING_USER_STORIES.md)
- [CCA_REMODEL.md](../CCA_REMODEL.md)
- [Educa8_API_Docs.md](../Educa8_API_Docs.md)
- [GEMINI.md](../GEMINI.md)
- [LOGIC_CHANGES_SUMMARY.md](../LOGIC_CHANGES_SUMMARY.md)
- [OTP_TOGGLE_GUIDE.md](../OTP_TOGGLE_GUIDE.md)
- [PRD_SVE_Threshold_Integration.md](../PRD_SVE_Threshold_Integration.md)
- [PRELIMS_MIGRATION_PLAN.md](../PRELIMS_MIGRATION_PLAN.md)
- [PRELIMS_QNA.md](../PRELIMS_QNA.md)
- [PRINTING_DETAIL_LOGIC.md](../PRINTING_DETAIL_LOGIC.md)
- [PROJECT_KNOWLEDGE.md](../PROJECT_KNOWLEDGE.md) (architecture sketch only; displaced on conflict)
- [REALTIME_REPORTS_PLAN.md](../REALTIME_REPORTS_PLAN.md)
- [SECONDARY_GRADEBOOK.md](../SECONDARY_GRADEBOOK.md)
- [SECONDARY_GRADE_MIGRATION_PLAN.md](../SECONDARY_GRADE_MIGRATION_PLAN.md)
- [STUDENT_TRANSFER_FEATURE_DOCUMENTATION.md](../STUDENT_TRANSFER_FEATURE_DOCUMENTATION.md)
- [view_student_awardees_rules.md](../view_student_awardees_rules.md)
- [view_student_awardees.sql](../view_student_awardees.sql)

## docs/

- [cambridge-pum-formula.md](../docs/cambridge-pum-formula.md)
- [IGCSE_ALevel_Grading_Plan.md](../docs/IGCSE_ALevel_Grading_Plan.md)
- [Secondary_Grade_Weights_Feature.md](../docs/Secondary_Grade_Weights_Feature.md)
- [SVE_Syllabus_AS_Level_Integration.md](../docs/SVE_Syllabus_AS_Level_Integration.md)
- [Threshold_Feature_Documentation.md](../docs/Threshold_Feature_Documentation.md)

## Repo files used for commands and wiring

Not product math:

- [bbs/client/package.json](../bbs/client/package.json) (serve binds port 4000)
- [bbs/client-teacher/package.json](../bbs/client-teacher/package.json) (serve binds port 4001)
- [bbs/client-student/package.json](../bbs/client-student/package.json) (start is CRA)
- [bbs/package.json](../bbs/package.json) (build-bcc; root start and dev-be hit retired bbs/api)
- [api_nest/package.json](../api_nest/package.json) (start:dev)
- [api_nest/README.md](../api_nest/README.md) (PORT default 3008; ENABLE_ORM_LOG table)
- [api_nest/.env.example](../api_nest/.env.example) (PARENT_WEB_LINK, ENABLE_ORM_LOGS, portal link names)
- [bbs/client/.env.sample](../bbs/client/.env.sample), [bbs/client-teacher/.env.sample](../bbs/client-teacher/.env.sample), [bbs/client-student/.env.sample](../bbs/client-student/.env.sample)
- [bbs/client/src/actions/makeApiRequest.js](../bbs/client/src/actions/makeApiRequest.js) and the teacher and student copies
- [api_nest/src/modules/](../api_nest/src/modules/) directory listing, 2026-09-02

Also used: workspace source brief gathered 2026-09-02 (ports, concatenation trap, swagger not wired, route counts). Ichsan 2026-09-02 for the run commands in Systems.

[Wiki home](README.md)
