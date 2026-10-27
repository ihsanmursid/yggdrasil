# BBS LMS wiki

Smartbag / Bina Bangsa School LMS. Klabs. Multi-campus school operations: academics, grading, attendance, CCA, finance, admissions, reports.

This wiki is the product catalog. Feature-specific math that already has its own file is summarized on the child pages and linked. Do not treat [PROJECT_KNOWLEDGE.md](../PROJECT_KNOWLEDGE.md) as source of truth when it conflicts with code or with these pages.

Source of truth for local run commands: Ichsan, 2026-09-02. Source of truth for feature math: the linked note, then the live code path named in that note.

The parent folder `~/Work/klabs/binabangsa` is not a git repo. Local roots: `~/Work/klabs/binabangsa/{bbs,api_nest}`. GitHub: bbs-lms/bbs, bbs-lms/api_nest.

Modules live under `api_nest/src/modules/`. Group titles on child pages are not an ACL. A name with `*` is a prefix, not a complete inventory.

## How to run and talk to the API

- [systems.md](systems.md): Live and retired BBS LMS pieces, local ports, env names, and how the three SPAs call api_nest.
- [rules.md](rules.md): Cross-cutting constraints that apply across modules: live rows, student status, API prefix, JSON:API, TypeORM, frontend stack.
- [access.md](access.md): CASL roles, JWT auth, OTP switches, and the login-page 2FA bypass.
- [access-rights.md](access-rights.md): Admin UI for roles. OTP, JWT, and CASL mechanics live on [access.md](access.md).
- [open-questions.md](open-questions.md): Flagged contradictions from the catalog. Each heading states the conflict and links to the page that records the encoded rule.
- [sources.md](sources.md): Source notes the catalog was drawn from, as relative links. Paths are local, not git.

## People and school

- [identity.md](identity.md) (index): People, campuses, org units, RBAC, and pick-up.
- [students.md](students.md): Student records in the admin portal. Teacher opens a student from a class year.
- [parents.md](parents.md): Parent records in the admin portal. API parent link env exists. There is no parent SPA in this repo.
- [employees.md](employees.md): Staff, positions, and organisations. Live admin nav is the Employee group.
- [campuses.md](campuses.md): Campuses, branches, and campus programmes. Org units that scope the rest of the catalog.
- [pickup.md](pickup.md): Pick-up persons, settings, check-in/out, and release.
- [academic-structure.md](academic-structure.md) (index): Year, programme, class, subject, timetable, banding, scheme of work, and lesson content.
- [academic-year.md](academic-year.md): The academic-year master used by class years, billing, and promotion.
- [programmes.md](programmes.md): Programme and master level. Admin nav label is Programme & Level.
- [classrooms.md](classrooms.md): Classroom master in admin. Teacher and student open class-year classrooms, not this master list.
- [class-in-year.md](class-in-year.md): Class year: a classroom plus programme plus academic year.
- [subject-in-year.md](subject-in-year.md): Subject year: a subject offered on a class year.
- [sow.md](sow.md): Scheme of work, lessons, materials, topics, and assignments.
- [file-sharing.md](file-sharing.md): Academic-department files and subject files.
- [promote.md](promote.md): Promote students between class years. This is not class-year grade transfer and not CCA transfer.
- [master-data.md](master-data.md): Leftover school and education masters that are not covered by campus, programme, classroom, or subject-in-year pages.
- [student-transfer.md](student-transfer.md): Class-year transfer of grades and reports. Not CCA transfer.

## Attendance

- [attendance.md](attendance.md): Canonical attendance rules, bulk create, daily sync, and teacher UI error handling.
- [pickup.md](pickup.md): Pick-up persons, settings, check-in/out, and release. Also listed under People and school.

## Gradebooks and reports

- [primary-reports.md](primary-reports.md) (index): Primary competency grades, homeroom reports, FTP, SPR, SED, and conduct remarks.
- [lo-settings.md](lo-settings.md): Admin learning-outcome routes and `learning-outcome-year` bulk-update rules.
- [spr-sed.md](spr-sed.md): Student Progress Report and Social Emotional Development admin routes.
- [reports.md](reports.md): Index of student report snapshots, class-report print, settings, transcripts, yellow reads. REALTIME_REPORTS_PLAN is a plan.
- [report-types.md](report-types.md): `ReportTypeEnum` 1 to 12, helper dispatch, LO rewrite, `listReportsByTerm` matrix, Handlebars inventory.
- [report-generate.md](report-generate.md): POST `/v1/reports` and POST `/v1/reports/update` both `create()`. No render GET. No lock.
- [report-print.md](report-print.md): Stored `report.html`, `htmlToPdfmake`, cover letter, term 4 `finalReport`, `canView`.
- [report-settings.md](report-settings.md): `ReportSetting` JSON, uniqueness, letter, helper field gates. GPA does not use it.
- [student-transcripts.md](student-transcripts.md): Primary 6 transcript from `StudentGrade`. Not a `Report` row.
- [yellow-reports.md](yellow-reports.md): Yellow form read API. Not a `ReportTypeEnum`.
- [awardees.md](awardees.md): Awardees view types, eligibility, INNER JOIN drop-through, LOWER/UPPER/SUBJECT/PQP rules, and NONE rows.
- [gradebooks.md](gradebooks.md): Admin grade books and primary default weights. Sec/JC FYA math is not on this page.
- [secondary-gradebook.md](secondary-gradebook.md): FYA formula, Sec1-3 vs Sec4-JC component weights, DCA exclusion, GRADEBOOK_SETTINGS, and JC still on the primary list.
- [secondary-gpa.md](secondary-gpa.md): Admin GPA grading scale and subject unit. FYA math stays on the secondary gradebook page.
- [grade-moderation.md](grade-moderation.md): Admin moderation routes. No invented math.
- [cambridge.md](cambridge.md): Cambridge component model: five tables, `Components.val` trap, unused per-paper boundary cells.
- [cambridge-pum.md](cambridge-pum.md): Pointer to the PUM interpolation note. This page does not invent band widths.
- [thresholds.md](thresholds.md): Cambridge grade-boundary thresholds. Two types, two admin routes, DRAFT then ACTIVE.
- [sve.md](sve.md) (index): School-based Validated Examination object model, admin and teacher routes.
- [sve-lock.md](sve-lock.md): Deadline `isLocked` toggle, who can lock, what the SPA blocks. Admin `/sve-lock` path is missing on nest.
- [sve-timetable.md](sve-timetable.md): Exam-type date and time, sessions, cover pages, timetable deadline lock.
- [sve-grade-input.md](sve-grade-input.md): Teacher grade input. SPA scoring. No status. No nest ACL.
- [sve-item-analysis.md](sve-item-analysis.md): Keys, import guards, FI and DI grades, analytics access.
- [sve-files.md](sve-files.md): Document statuses, auto-send, BMT download, supporting files, past paper.
- [sve-printing.md](sve-printing.md): Printing-request quantities. Branch requests plus exam-type documents become paper counts.
- [prelims.md](prelims.md): PRELIMS_QNA answers and the migration constraint. Plan file is a plan.

## CCA

- [cca.md](cca.md): CCA model, registration statuses and guards, quota Q4 vs section 4, coordinator cap, Q6, and transfer with no quota check.

## Finance

- [finance.md](finance.md) (index): Campus billing, invoices, payments, wallets, deposits, promo and product masters. No invented fee math.
- [products.md](products.md): Admin Product nav: category, template, type, and product list. Catalog setup for fees, not the billing run.
- [student-billing.md](student-billing.md): Per-student billings and the product billing report. Created from Finance nav or from an admission.
- [invoices.md](invoices.md): Invoices, payment list, installment requests, and refund requests.
- [wallets.md](wallets.md): Wallets, student virtual accounts, security deposits, and master accounts.
- [discounts.md](discounts.md): Master discounts, per-student discounts, promos, merchant discount rate, and penalty setting.
- [document-templates.md](document-templates.md): Finance nav templates for generated documents (offer letters and similar). Not certificate templates.

## Admission

- [admissions.md](admissions.md) (index): Applicant intake, offers, documents, lead source, and placement tests. No invented scoring formulas.
- [student-admission.md](student-admission.md): Applicant records, approval, and add-billing from an admission.
- [offer-admission.md](offer-admission.md): Offers of admission, approval, and PDF preview. generate-oa is not a live route.
- [document-verification.md](document-verification.md): Admission document review for a student admission.
- [placement-tests.md](placement-tests.md): Placement test definitions, schedules, settings, and results. No invented scoring formulas.

## Discipline, certificates, other

- [certificates.md](certificates.md) (index): Certificates, medals, badges, discipline, LEAPS, health, promotion, transcripts.
- [certificates-admin.md](certificates-admin.md): Certificate templates and issue screens. Student reads `/my-certificate`.
- [medals.md](medals.md): Medal types, medals, badge types, badges, and e-badges. Gradebook medal numbers are not this catalog.
- [leaps.md](leaps.md): LEAPS types and events. Teacher form-class records events. No invented scores.
- [discipline.md](discipline.md): Primary discipline overview, reports, tardiness, and statistics.
- [secondary-discipline.md](secondary-discipline.md): Secondary category, yellow and merit forms, reports, verify-conduct, and reductions.
- [analytics.md](analytics.md): Admin analytics screens and teacher SVE item-analysis.
- [media-storage.md](media-storage.md): Admin media library. File module is the shared upload helper, not the File Sharing nav.
- [other-modules.md](other-modules.md): Live api_nest modules that have no dedicated product note. Treat as live code, not as specified product math.

## Systems

Five live pieces. One retired tree. Do not start the retired tree. Env samples, token keys, and JSON:API envelope: [systems.md](systems.md).

| Piece | Path | Role | Local command | Port |
| --- | --- | --- | --- | --- |
| Admin portal | `bbs/client` | Back office | From that dir: npm run serve (vite --port 4000) | 4000 |
| Teacher portal | `bbs/client-teacher` | Teacher, HOD, form class, SVE | From that dir: npm run serve (vite --port 4001) | 4001 |
| Student portal | `bbs/client-student` | Student | From that dir: npm run start | CRA default 3000 |
| Shared UI | `bbs/bbs-client-common` | Components used by teacher and student | From `bbs` root: yarn build-bcc | none |
| Live API | `api_nest` | NestJS API | From that repo: npm run start:dev | `PORT` default 3008 |

Retired: `bbs/api`. Express app. Unused and not related to the live stack. Do not start it. `bbs` root scripts `start` and `dev-be` still point at this tree. Ignore those scripts.

Build teacher or student only after yarn build-bcc. Those two portals depend on `file:../bbs-client-common/dist`.

## Branding

Branding in the three SPAs: BBS Admin, BBS Teacher, BBS Student. Package names: `@bbs-lms/admin-portal`, `@bbs-lms/teacher-portal`, `@bbs-lms/student-portal`. API package name: `bbs_api`. Nickname Smartbag appears in the teacher-portal fallback URL and the SES sender default.

## Out of scope

- `bbs/api` (retired Express). Do not start it.
- Parent SPA (not in repo). `PARENT_WEB_LINK` is an env name only.
- Ambassador and exo.
- Invented formulas not in the source notes (fee math, LEAPS scores, placement scoring, PUM band widths copied as if they were this catalog numbers).
- Swagger UI (`main.ts` does not wire it).
- [PROJECT_KNOWLEDGE.md](../PROJECT_KNOWLEDGE.md) claims that conflict with Ichsan 2026-09-02 commands, with `.env.sample` concatenation, or with `main.ts` (Swagger, admin start port, microservices).
- `bbs/client` view folder `kmzway87aa`.
