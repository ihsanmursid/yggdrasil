# Primary reports

Primary competency grades, homeroom reports, FTP, SPR, SED, and conduct remarks.

## Children

- [lo-settings.md](lo-settings.md): learning outcomes, in-years, grade settings, analyses; bulk-update rules
- [spr-sed.md](spr-sed.md): /spr, /spr-grade-setting, /sed; teacher /spr, /sed
- [reports.md](reports.md): class/student reports, settings, transcripts (index)
- [report-types.md](report-types.md): `ReportTypeEnum`, helpers, LO rewrite, Handlebars
- [report-generate.md](report-generate.md): POST create snapshot
- [report-print.md](report-print.md): stored html print
- [report-settings.md](report-settings.md): `ReportSetting` JSON and helper gates
- [student-transcripts.md](student-transcripts.md): Primary 6 transcript, not a `Report` row
- [yellow-reports.md](yellow-reports.md): yellow form read API
- [awardees.md](awardees.md): LOWER/UPPER/SUBJECT/PQP

See also:

- [certificates.md](certificates.md)
- [academic-structure.md](academic-structure.md)
- [sources.md](sources.md)

## Modules

Modules: learning-outcome, learning-outcome-year, learning-outcome-analysis, learning-outcome-certificate, learning-indicator, learning-indicator-grade, lo-grade-setting, lo-year-learning-outcome, ftp-evaluation-setting, ftp-grade-master-subject, ftp-grade-setting, ftp-report-content, ftp-report-table, spr-component, spr-grade-master-subject, spr-grade-setting, student-spr, sed, sed-activity, sed-competency, sed-indicator, student-sed, conduct, student-ftp-conduct, secondary-verify-conduct, remark, yellow-report, student-report, report, report-setting.

Portals: admin configures outcomes and report settings. Teacher enters indicator grades, FTP, SPR, SED, conduct. Student reads `/report`.

`learning-outcome-year` bulk-update rules (in-batch duplicate check, merge when moved onto an existing combination, normalize IDs, skip `checkDuplicate` when the combination did not change, reload relations, MUST load `learningIndicators` and `learningOutcomes` on GET, MUST NOT compare string IDs to numeric IDs): [lo-settings.md](lo-settings.md) from [LOGIC_CHANGES_SUMMARY.md](../LOGIC_CHANGES_SUMMARY.md).

Awardees view rules: [awardees.md](awardees.md).

[REALTIME_REPORTS_PLAN.md](../REALTIME_REPORTS_PLAN.md) is a plan, not a shipped contract. See [reports.md](reports.md). Do not treat on-demand render or finalize/lock as current MUST rules unless code already does that. The plan states reports must not silently rewrite issued records.

[Wiki home](README.md)
