# Attendance

Canonical attendance rules, bulk create, daily sync, and teacher UI error handling.

See also:

- [rules.md](rules.md)
- [academic-structure.md](academic-structure.md)
- [identity.md](identity.md)
- [sources.md](sources.md)

Canonical rules from [ATTENDANCE_REQUIREMENTS_COMPLIANCE.md](../ATTENDANCE_REQUIREMENTS_COMPLIANCE.md):

1. Filter terms by `attendance.date`, not `created_at`.
2. Inclusive boundaries (>= and <=, `isSameOrAfter` and `isSameOrBefore`).
3. Exclude soft-deleted attendance (`deleted_at is null` or `deletedAt: IsNull()`).
4. Do not count present in absent or late.
5. CURRENT + ACTIVE students only.

## Modules

Modules: attendance, daily-attendance, student-attendance-report, late-time-setting.

`createBulk` and `syncDailyAttendance` live in `api_nest/src/modules/attendance/attendance.service.ts`. Daily attendance is complete when `totalAttendance === totalStudent` of CURRENT+ACTIVE students in that class year. Status codes in `syncDailyAttendance`: `'1'` present, `'2'` late.

`create` returns empty attendance if `studentStatus !== CURRENT`. `daily-attendance.service.ts` `synchronizeDailyAttendanceStatus` uses the same CURRENT+ACTIVE filter.

Teacher UI MUST NOT silently show 0 on load failure. File: `bbs/client-teacher/src/views/classrooms/ClassroomDetailsAttendances.jsx`. Same pattern: `ClassroomAttendanceSummary.jsx`. Error path shows a retry (`dailyAttendancesApi?.refresh?.()`). Defaulting `presentCount` to 0 is allowed only after the error state is ruled out.

Portals: teacher records daily attendance. Admin reads reports. Student does not own this write path.

The compliance note records a 13 vs 12 student-count debug as in progress. Do not treat that count as a product number.

[Wiki home](README.md)
