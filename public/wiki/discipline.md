# Discipline

Primary discipline overview, reports, tardiness, and statistics.

See also:

- [secondary-discipline.md](secondary-discipline.md)
- [attendance.md](attendance.md)
- [certificates.md](certificates.md)
- [identity.md](identity.md)

## Admin routes

Discipline nav:

| Nav | Path |
| --- | --- |
| Overview | `/discipline-overview` |
| Report | `/discipline`, `/discipline/add-report` |
| Tardiness | `/tardiness`, `/discipline/add-tardiness-report` |
| Statistics | `/discipline-statistics` |

Secondary items in the same nav (category, secondary report, verify conduct, reductions) are [secondary-discipline.md](secondary-discipline.md).

## Teacher routes

Attendance Monitoring (principal or VP): `/attendance-monitoring/discipline`. Daily attendance sibling: `/attendance-monitoring`. See [attendance.md](attendance.md).

## Modules

Modules: discipline, master-discipline.

API: `/v1/disciplines` including `GET /disciplineFormStatistics`. Create permissions named: `DISCIPLINE`, `DISCIPLINE_REPORT`, `DISCIPLINE_TARDINESS_REPORT`.

Portal: admin owns setup and reports. Teacher principal/VP reads the monitoring discipline view. Student does not own this write path.

[Wiki home](README.md)
