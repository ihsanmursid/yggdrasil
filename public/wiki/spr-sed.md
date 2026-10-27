# SPR and SED

Student Progress Report and Social Emotional Development admin routes. Teacher paths exist in source and are commented out.

See also:

- [primary-reports.md](primary-reports.md)
- [certificates.md](certificates.md)
- [reports.md](reports.md)
- [lo-settings.md](lo-settings.md)

## Admin

| Route | Notes |
| --- | --- |
| /spr | SPR |
| /spr-grade-setting | SPR grade setting. Also /spr-grade-setting/add, /spr-grade-setting/edit/:academicYearId |
| /sed | SED. Also /sed/add, /sed/:sedId/edit, /sed/:sedId |

## Teacher

`bbs/client-teacher/src/routes.js` still imports SPR and SED views. The routes themselves are commented with `TODO: Temporary commented, will be used later` (as of 2026-09-02):

| Route | Name in that file |
| --- | --- |
| /spr | SPR |
| /spr/:classYearId/:academicYearId | Add SPR |
| /sed | Social Emotional Development |
| /sed/:classYearId/:academicYearId | Add SED |

Homeroom flag on those commented blocks: `requireHomeroom: true`.

Teacher FTP is wired as `/ebadges` and `/ebadges/:classYearId/:academicYearId` (FTP / FTPDetail components), not as `/ftp`. Admin `/ftp` routes are also commented in `bbs/client/src/routes.js`.

## Modules

SPR: spr-component, spr-grade-master-subject, spr-grade-setting, student-spr.

SED: sed, sed-activity, sed-competency, sed-indicator, student-sed.

FTP (related, still listed on [primary-reports.md](primary-reports.md)): ftp-evaluation-setting, ftp-grade-master-subject, ftp-grade-setting, ftp-report-content, ftp-report-table.

No extra SPR/SED numeric formulas in the scattered notes. Do not invent them. [REALTIME_REPORTS_PLAN.md](../REALTIME_REPORTS_PLAN.md) Phase 3 says SED/SPR appear unused — confirm before skipping; that file is a plan.

[Wiki home](README.md)
