# Medals

Medal types, medals, badge types, badges, and e-badges. Gradebook medal numbers are not this catalog.

See also:

- [awardees.md](awardees.md)
- [secondary-gradebook.md](secondary-gradebook.md)
- [certificates.md](certificates.md)
- [certificates-admin.md](certificates-admin.md)

## Admin routes

| Nav group | Nav | Path |
| --- | --- | --- |
| Education Master Data | Badge Type, Badges | `/badge-type`, `/badges` (add/detail/edit on type) |
| Education Master Data | Medal Type, Medals | `/medal-type`, `/medals` (add/detail/edit on type) |
| Non Education Master Data | E-Badges | `/ebadges` |
| Academic Year Data → Grades | E-Badges Grade Setting | `/ebadges-grade-setting` |

Report → Certificates → Subject Medals (`/certificates/subject-medal`) is the certificate issue screen. See [certificates-admin.md](certificates-admin.md).

## Teacher routes

Grade nav E-Badges: `/ebadges`, `/ebadges/:classYearId/:academicYearId`. Subject `FORM_TEACHER_PERIOD`.

`/student-badges` is commented out in teacher `routes.js` and `_nav.jsx`. Not live.

## Modules

Modules: medal*, badge*, student-medal, student-badge.

A name with `*` is a prefix. Related: medal, medal-type, subject-medal, badge, badge-type.

UPPER subject medals in the awardees view: [awardees.md](awardees.md). Secondary gold/silver/bronze thresholds live on secondary-grade-weight (`-1` disabled). See [secondary-gradebook.md](secondary-gradebook.md). Do not copy those numbers here as if this page owned them.

Portal: admin configures types. Teacher form-class records e-badges.

[Wiki home](README.md)
