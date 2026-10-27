# Open questions

Flagged contradictions from the catalog. Each heading states the conflict and links to the page that records the encoded rule. This page does not pick a winner unless that page already names one.

See also:

- [README.md](README.md)
- [systems.md](systems.md)
- [cca.md](cca.md)
- [awardees.md](awardees.md)
- [cambridge.md](cambridge.md)
- [prelims.md](prelims.md)
- [secondary-gradebook.md](secondary-gradebook.md)
- [access.md](access.md)
- [report-types.md](report-types.md)
- [report-generate.md](report-generate.md)
- [secondary-gpa.md](secondary-gpa.md)
- [spr-sed.md](spr-sed.md)
- [sve.md](sve.md)
- [sve-lock.md](sve-lock.md)
- [sve-item-analysis.md](sve-item-analysis.md)

## CCA quota Q4 versus section 4

Q4 says when maleQuota or femaleQuota is set, total quota is ignored. Section 4 of [CCA_REMODEL.md](../CCA_REMODEL.md) says both total and gender must pass. Follow Q4 until the section 4 text is edited. Encoded rule: [cca.md](cca.md).

## CCA coordinator cap

Phase 2 says max 2. Data-model section says max 3 (cca-year-coordinator service). Unresolved. Encoded rule: [cca.md](cca.md).

## JC on both grade-weight lists

Secondary settings cover ids 7-17. Primary DefaultGradeWeights.jsx still lists ids 15-17. syncMasterLevels() already dropped 7-14 only. Encoded rule: [secondary-gradebook.md](secondary-gradebook.md).

## Cambridge per-paper cells unused

Cambridge per-paper a*, a, b cells are unused on the gradebook path. threshold.avg_value ACTIVE is what grades. Third store is a trap for editors. Encoded rule: [cambridge.md](cambridge.md).

## OTP UI toggle bypass

RESOLVED (2026-09-30): the login-page toggle and the localStorage `OTP_ENABLED` switch are gone. `OTP_ENABLED` has zero matches across all three portal sources; both `Login.jsx` files keep only the OTP verify flow. Only the API env switch (`OTP_ENABLED`, default off) remains — encoded rule: [access.md](access.md).

## Portal env host 8080 versus 3008

Portal .env.sample hosts localhost:8080 vs live api_nest PORT 3008. Encoded rule: [systems.md](systems.md).

## CCA registrations default pageSize 5

UPDATED (2026-09-30): the `PageOptionsDto` default of 5 exists but `ccaRegistrations` findAll reads the query as untyped `any`, so the list is unbounded (probe: 6 rows, `pageCount: null`). Lists MUST pass an explicit pageSize — encoded rule: [cca.md](cca.md).

## Portal path concatenation

Admin and student samples /api/v1 plus code v1 become /api/v1v1. Teacher VITE_API_BASE_PATH=/api/ is the working pattern. Admin fallback "/api/". Encoded rule: [systems.md](systems.md).

## ENABLE_ORM_LOG versus ENABLE_ORM_LOGS

ENABLE_ORM_LOG (README) vs ENABLE_ORM_LOGS (.env.example). Encoded rule: [systems.md](systems.md).

## Awardees encoded rules flagged for review

Awardees: exact equality on UPPER gold and a_mark and PQP exceeding = 4. INNER JOIN drop-through drops students with no banding or homeroom teacher. Hardcoded subject names. NONE rows returned. These are encoded rules, flagged for policy review, not rewritten here. Encoded rule: [awardees.md](awardees.md).

## CCA Q6 classroom-name parsing

Per-level cap still on classroom-name parsing in cca-registration-rules.service.ts. Encoded rule: [cca.md](cca.md).

## Secondary grade weights versioning

[Secondary_Grade_Weights_Feature.md](../docs/Secondary_Grade_Weights_Feature.md) describes academic-year versioning and term-component settings. [SECONDARY_GRADEBOOK.md](../SECONDARY_GRADEBOOK.md) does not. Confirm the entity before treating versioning as shipped. Encoded rule: [secondary-gradebook.md](secondary-gradebook.md).

## Prelims Q11 predicted PUM by term

[PRELIMS_QNA.md](../PRELIMS_QNA.md) Q11: predicted PUM selection is by term in code, not by level, while JC is supposed to prefer as_predicted_pum. Encoded rule: [prelims.md](prelims.md).

## PROJECT_KNOWLEDGE.md versus this wiki

[PROJECT_KNOWLEDGE.md](../PROJECT_KNOWLEDGE.md) vs this wiki: Swagger, admin port, microservices, bbs/api as live, parent portal as a frontend. This wiki wins on those points. Encoded rule: [README.md](README.md) and [systems.md](systems.md).

## SPR and SED helpers live, generate UI unused

`createStudentSprReport` and `createStudentSedReport` plus `student-spr-report.hbs` and `student-sed-report.hbs` are live. `listReportsByTerm` comments SPR and SED out. Generate modal never offers them. `ReportCard.jsx` filters `SED` and `SPR` as unused. Teacher `/spr` and `/sed` routes are commented as of 2026-09-02. Encoded rule: [report-types.md](report-types.md), [spr-sed.md](spr-sed.md).

## POST /reports and /reports/update both create()

Admin Cambridge generate posts `/v1/reports`. Other types post `/v1/reports/update`. Both controller methods call `reportService.create()`. Encoded rule: [report-generate.md](report-generate.md).

## academicRankClassSize quirk

GPA report sets `academicRankClassSize` to `` `1/${classYear.students.length}` `` with comment `:p`. Encoded quirk, not policy. Encoded rule: [secondary-gpa.md](secondary-gpa.md).

## Admin SVE lock screen vs live nest

Admin `/sve-lock` calls `GET` and `PUT` `/sves/component/lock`. Those routes exist on retired `bbs/api`. `api_nest` `SveController` has no `component/lock`. Live blocking uses `SveDeadline.isLocked` on assign and timetable SPAs, not `SveExamType.lockDocument` or `lockAssignee`. Encoded rule: [sve-lock.md](sve-lock.md).

## Item analysis MCQ option E vs view A to D

Import and grade input accept MCQ keys `A` to `E`. `VIEW_SVE_ITEM_ANALYSIS_EXPRESSION` counts options A to D only. Encoded rule: [sve-item-analysis.md](sve-item-analysis.md), [sve-grade-input.md](sve-grade-input.md).

## Unused student-report Handlebars files

`student-gpa-transcript.hbs`, `student-mid-gpa-report.hbs`, and `student-as-prelim-report.hbs` have no helper reference. Also unused: `student-semester1-report-p1-2.hbs`, `index.html`. Encoded rule: [report-types.md](report-types.md).

[Wiki home](README.md)
