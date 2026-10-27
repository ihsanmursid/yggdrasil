# Yggdrasil Node Mapping — Hierarchical Draft (V3)

Draft untuk review. Ini versi berjenjang dari V2: **level 1 = 9 domain**, **level 2 = sub-domain**, **level 3 = menu/menu-item frontend**. Backend (module + endpoint) dan wiki menempel di level 3 sebagai informasi pendukung.

Sumber: `bbs/client/src/containers/_nav.jsx` (Admin), `bbs/client-teacher/src/containers/_nav.jsx` (Teacher), `bbs/client-student/src/containers/_nav.js` (Student); endpoint dari `bbs/<app>/src/actions/*.js`; wiki dari `bbs-wiki/*.md`.

## Aturan struktur

- **L1** = domain siklus hidup siswa (9 domain, sudah disepakati).
- **L2** = kelompok fungsi di dalam domain.
- **L3** = satu node per layar/menu frontend. Kolom menampilkan route, portal, backend, wiki.
- Menu induk yang hanya embung (dropdown tanpa layar sendiri) tidak jadi node L3; anak-anaknya yang jadi node.
- Tanda `(!)` = masih perlu keputusan/verifikasi.
- **Route ditulis relatif** terhadap base tiap portal. Base path: **`/admin`** untuk portal Admin (`bbs/client`), **`/teacher`** untuk portal Teacher (`bbs/client-teacher`), **`/student`** untuk portal Student (`bbs/client-student`). Contoh: `/students` di portal Admin berarti `/admin/students`.

## Cakupan

| L1 Domain | L2 Sub-domain | L3 Node |
|---|---|---|
| 1 Admission | 3 | 6 |
| 2 Identity & Enrollment | 4 | 10 |
| 3 Curriculum & Learning | 5 | 15 |
| 4 Teaching & Assessment | 6 | 25 |
| 5 Co-Curricular | 4 | 13 |
| 6 Attendance & Campus Ops | 3 | 10 |
| 7 Finance | 4 | 15 |
| 8 Credentials & Reporting | 3 | 9 |
| 9 Administration & Config | 3 | 9 |
| **Total** | **34** | **112** |

---

# 1. Admission

**L2 1.1 Application Intake** — calon siswa masuk sebagai applicant.
- **L3 Student Admission** — `/admissions` — Admin — `student-admission`, `/studentAdmissions` — `student-admission.md`, `admissions.md`
- **L3 Lead Generation (!)** — no menu — Admin — `leadgen` — `admissions.md`

**L2 1.2 Screening & Documents** — verifikasi kelayakan dan dokumen.
- **L3 Document Verification** — `/document-verification` — Admin — `admission-document`, `admission-agreement`, `/admissionDocuments`, `/admissionAgreements` — `document-verification.md`
- **L3 Placement Test** — `/placement-test-schedules` — Admin, Teacher — `placement-test*`, `/placementTestSchedules`, `/placementTestResults`, `/placementTestAttempts` — `placement-tests.md`

**L2 1.3 Offer & Test Result** — keputusan dan hasil uji penempatan.
- **L3 Offer Admission** — `/offer-admissions` — Admin — `offer-admission`, `/offerAdmissions`, `/offerAdmissions/previewPdf` — `offer-admission.md`
- **L3 Placement Test Result** — `/placement-test-results` — Teacher — `placement-test-results`, `/placementTestResults/bulk` — `placement-tests.md`

---

# 2. Identity & Enrollment

**L2 2.1 People Registry** — siapa saja yang ada di sistem.
- **L3 Student** — `/students` — Admin — `students`, `/students`, `/students/:id` — `students.md`
- **L3 Parents** — `/parents` — Admin — `parents`, `/parents`, `/parents/student/:studentId` — `parents.md`
- **L3 Employee** — `/organizations`, `/positions`, `/employees` — Admin — `organizations`, `positions`, `position-scope`, `employees`, `employee-identities`, `employee-positions` — `employees.md`, `identity.md`

**L2 2.2 Class Placement** — siswa ditempatkan ke kelas per tahun ajaran.
- **L3 Class in Year** — `/class-in-year` — Admin — `class-year`, `/classYears`, `/classYears/:id` — `class-in-year.md`

**L2 2.3 Movement & Progression** — perpindahan dan kenaikan.
- **L3 Student Transfer** — `/class-in-year` (aksi transfer) — Admin — `/classYears/transfer` — `student-transfer.md`
- **L3 Promote Student** — `/promote` — Admin — `promote`, `/classYears/transfer` — `promote.md`
- **L3 Streaming & Promotion** — `/streaming-and-promotion` — Teacher — `promote`, `/classYears/transfer` — `promote.md`

**L2 2.4 Leave & Access** — ketidakhadiran resmi dan hak akses.
- **L3 Leaves (siswa)** — `/leaves` — Admin — `leaves`, `/leaves` — —
- **L3 Leave Form / Leave Requests (guru)** — `/leave-form`, `/leave-requests` — Teacher — `leaves`, `/leaves` — —
- **L3 Access Rights** — `/access-rights` — Admin — `user-role`, `casl`, `user-ability`, `/userRole`, `/userRole/user/permissions` — `access-rights.md`, `access.md`, `rules.md`

---

# 3. Curriculum & Learning

**L2 3.1 Subject Structure** — definisi mata pelajaran.
- **L3 Master Subject** — `/master-subjects` — Admin — `master-subjects`, `/masterSubjects`, `/masterSubjectCoordinators` — `academic-structure.md`
- **L3 Subject** — `/subjects` — Admin — `subjects`, `/subjects`, `/subjectYears` — `subject-in-year.md`
- **L3 Subject in Year** — `/subject-in-year` — Admin — `subject-year`, `/subjectYears` — `subject-in-year.md`
- **L3 Subject Chapter** — `/subject-chapters` — Admin — `subject-chapters`, `/subjectChapters` — `academic-structure.md`

**L2 3.2 Learning Content** — materi dan pustaka.
- **L3 Subject Library (admin)** — `/subject-libraries` — Admin — `subject-libraries`, `/subjectLibraries`, `/subjectLibraries/reorderLessons` — `academic-structure.md`
- **L3 Resources (guru)** — `/resources` — Teacher — `subject-libraries`, `lessons`, `topics`, `/subjectLibraries`, `/lessons`, `/topics` — `academic-structure.md`
- **L3 Subject Library (siswa)** — `/subjectLibrary` — Student — `subject-libraries`, `lessons`, `/subjects/subjectLibrary` — `academic-structure.md`

**L2 3.3 Planning** — perencanaan pengajaran.
- **L3 SOW** — `/sow` — Admin — `sow`, `syllabus`, `syllabus-component`, `/sow`, `/syllabus` — `sow.md`
- **L3 Scheme of Works (guru)** — `/sows` — Teacher — `sow`, `/sow` — `sow.md`
- **L3 Lesson Plan** — `/lesson-plan`, `/lesson-plan/library`, `/lesson-plan/file-library`, `/lesson-plan/no-submission` — Admin, Teacher — `lesson-plan`, `lessons`, `material`, `/lesson-plans`, `/lesson-plans/library`, `/materials` — `academic-structure.md`

**L2 3.4 Teaching Activity** — tugas dan kelas berjalan.
- **L3 Assignments** — `/assignments` — Teacher, Student — `assign-assignment`, `student-assignment`, `/assignments`, `/assignments/teacher`, `/assignments/student` — —
- **L3 Classroom (siswa)** — `/classroom` — Student — `class-year`, `classroom`, `/classrooms` — `class-in-year.md`
- **L3 Classrooms (guru)** — `/classrooms` — Teacher — `class-year`, `classroom`, `/classYears` — `class-in-year.md`
- **L3 My Subjects (siswa)** — `/subjects` — Student — `subject-year`, `topics`, `lessons`, `/subjectYears` — `academic-structure.md`

**L2 3.5 Scheduling**
- **L3 Calendar** — `/calendar` — Teacher, Student — `schedule`, `/schedules` — —

---

# 4. Teaching & Assessment

**L2 4.1 Grading Framework** — aturan dan bobot penilaian.
- **L3 Grading Guide** — `/grading-guides` — Admin — `grading-guides`, `/gradingGuides`, `/bandings` — `thresholds.md`
- **L3 Default Grade Weights** — `/default-grade-weights` — Admin — `defaultGradeWeights`, `/defaultGradeWeights` — —
- **L3 Grade Book Settings** — `/grade-books` — Admin — `gradebook`, `/gradebookTables`, `/gradebookExams`, `/gradeSchema` — `gradebooks.md`
- **L3 Secondary Grade Weights / GPA Scales / GPA Subject Units** — `/secondary-grade-weights`, `/secondary-gpa-gs`, `/secondary-gpa-su` — Admin — `secondary-grade-weight`, `secondary-gpa-*` — `secondary-gpa.md`

**L2 4.2 Learning Outcomes** — capaian pembelajaran.
- **L3 LO Library & LO Analyses** — `/learning-outcomes`, `/learning-outcome-analyses` — Admin — `learning-outcome`, `learning-indicator`, `/learningOutcomes`, `/learningOutcomeAnalyses` — `lo-settings.md`
- **L3 LO Grade Settings & LO in Year** — `/learning-outcome-grade-settings`, `/learning-outcome-in-years` — Admin — `lo-grade-setting`, `learning-outcome-year`, `/loGradeSettings`, `/learningOutcomeYears` — `lo-settings.md`

**L2 4.3 Examination (SVE & Cambridge)** — ujian dan validasi nilai eksternal.
- **L3 SVE (admin)** — `/sve-*` (13 layar: component, list, deadline, timetable, printing, cover, report, submission, label, errata, bmt-week, box) — Admin — `sve`, `sve-*`, `bmt-weeks`, `master-sve-*` — `sve*.md`
- **L3 SVE (guru)** — `/sves`, `/grade-input/:id`, `/item-analysis-analytics/:id`, `/sves-past-paper/:id` — Teacher — `sve`, `sve-item-analysis`, `/grades/bulk` — `sve*.md`
- **L3 BMT & Exam Supporting File** — `/bmt-files/:id`, `/exam-supporting-files/:id` — Teacher — `bmt-weeks`, `sve-files`, `/files/sve` — `sve-files.md`
- **L3 Threshold IGCSE/A & AS Prelim** — `/threshold`, `/threshold-as-prelim` — Admin — `threshold`, `/threshold/active` — `thresholds.md`, `cambridge.md`, `prelims.md`
- **L3 Student Cambridge Actual Grade** — `/student-cambridge-actual-grade` — Admin — `student-cambridge-grade`, `/grade-moderation/bulk-update` — `cambridge.md`, `cambridge-pum.md`
- **L3 IGCSE / A / AS Level Gradebook** — `/cambridge-gradebook/{igcse,a-level,as-level}` — Teacher — `student-cambridge-grade`, `/student-cambridge-grade/*` — `cambridge.md`

**L2 4.4 Grade Entry & Moderation** — input dan moderasi nilai.
- **L3 Gradebook** — `/gradebook` — Teacher — `gradebook`, `/gradebookTables`, `/grades` — `gradebooks.md`
- **L3 Secondary Gradebook & DCA** — `/secondary-gradebook`, `/dca` — Teacher — `secondary-gradebook`, `/secondaryGradeWeights`, `/dca/rubrics` — `secondary-gradebook.md`
- **L3 Moderation** — `/moderation/add`, `/moderation/list` — Admin — `grade-moderation`, `/grade-moderation-fye-mye/*` — `grade-moderation.md`

**L2 4.5 Conduct & Discipline** — penilaian perilaku dan konsekuensinya.
- **L3 E-Badges (master)** — `/ebadges` (Non Education Master Data) — Admin — `ftp`, `/ftpComponents` — `cca.md`
- **L3 E-Badges Grade Setting** — `/ebadges-grade-setting` — Admin — `ftp-grade-setting`, `/ftpGradeSettings` — —
- **L3 E-Badges (input)** — `/ebadges` — Teacher — `ftp`, `student-ftp-conduct`, `/ftps`, `/studentFtpConducts` — `cca.md`
- **L3 Remark (Form Class)** — `/remark` — Teacher — `remark`, `/remarks`, `/conducts/bulk` — `students.md`
- **L3 Height & Weight** — `/height-and-weight` — Teacher — `health`, `/heightWeights/bulk` — —
- **L3 Conduct** — `/conduct` — Teacher — `conduct`, `ftp`, `/studentFtpConducts` — `secondary-discipline.md`
- **L3 Secondary Verify Conduct** — `/secondary-verify-conduct` — Admin — `secondary-verify-conduct`, `/secondaryVerifyConducts/grid` — `secondary-discipline.md`
- **L3 Discipline** — `/discipline-overview`, `/discipline`, `/tardiness`, `/discipline-statistics` — Admin, Teacher — `discipline`, `student-attendance-reports` — `discipline.md`
- **L3 Secondary Discipline** — `/secondary-discipline-category`, `/secondary-discipline`, `/secondary-discipline-report` — Admin — `secondary-discipline-category`, `secondary-discipline-form` — `secondary-discipline.md`
- **L3 Reduction & Discount Reduction** — `/secondary-discipline-reduction`, `/secondary-discipline-discount-reduction` — Admin — `secondary-discipline-reduction`, `secondary-discipline-discount-reduction`, `master-secondary-discipline-merit` — `secondary-discipline.md`

---

# 5. Co-Curricular

**L2 5.1 CCA Program** — program kegiatan ekstrakurikuler.
- **L3 Co-Curricular Activities (CCA)** — `/cca` — Admin — `cca`, `/cca` — `cca.md`
- **L3 CCA Grade Settings & Term Setting** — `/cca-grade-settings` — Admin — `cca-grade-setting`, `cca-grade-term-setting` — `cca.md`
- **L3 CCA In Year (list & assignment)** — `/cca-in-year`, `/cca-in-year-assignment` — Admin — `cca-year`, `cca-year-coordinator`, `/ccaYears` — `cca.md`

**L2 5.2 CCA Registration & Grading**
- **L3 CCA Registration (rules, management, windows)** — `/cca-registration-*` — Admin — `cca-registration`, `cca-registration-rules`, `cca-registration-window` — `cca.md`
- **L3 CCA Grading** — `/ccaYear` — Teacher — `cca-year`, `student-cca-grade` — `cca.md`
- **L3 CCA Assignment (guru)** — `/ccaYearAssignment` — Teacher — `cca-year-coordinator`, `/ccaYearCoordinators` — `cca.md`
- **L3 CCA Approvals** — `/ccaRegistrationApprovals` — Teacher — `cca-registration` — `cca.md`
- **L3 CCA & Registration (siswa)** — `/ccaYear`, `/cca-registration` — Student — `cca-year`, `cca-registration` — `cca.md`

**L2 5.3 LEAPS**
- **L3 LEAPS Type & Event** — `/leaps-type`, `/leaps-event` — Admin — `leaps-type`, `leaps-event` — `leaps.md`
- **L3 LEAPS (pencatatan guru)** — `/leaps` — Teacher — `leaps-event`, `student-leaps-remark`, `/leaps/bulk` — `leaps.md`

**L2 5.4 Recognition** — badge dan medali.
- **L3 Badges** — `/badge-type`, `/badges` — Admin — `badges`, `badge-types` — —
- **L3 Medals** — `/medal-type`, `/medals` — Admin — `medals`, `medal-types` — `medals.md`
- **L3 Subject Medals** — `/certificates/subject-medal` — Admin — `subject-medal`, `student-medal` — `medals.md`, `awardees.md`

---

# 6. Attendance & Campus Operations

**L2 6.1 Attendance Tracking**
- **L3 General Overview** — `/general-overview` — Admin — `attendances`, `student-attendance-reports` — `attendance.md`
- **L3 Daily Attendance** — `/daily-attendance` — Admin — `daily-attendances`, `/dailyAttendances/bulk` — `attendance.md`
- **L3 Attendance Lateness** — `/attendance-lateness` — Admin — `late-time-settings` — —
- **L3 Check in & Check Out** — `/checking` — Admin — `campus-gates`, `attendances` — —
- **L3 Attendance Monitoring (guru)** — `/attendance-monitoring`, `/attendance-monitoring/discipline` — Teacher — `attendances`, `daily-attendances`, `disciplines` — `attendance.md`, `discipline.md`

**L2 6.2 Pickup & Release**
- **L3 Student Pick Up & Setting** — `/student-pick-up`, `/student-pick-up-setting` — Admin — `student-pick-up*`, `/studentPickUps`, `/studentPickUpSettings` — `pickup.md`
- **L3 Release Student** — `/release-student` — Admin, Teacher — `student-pick-up-requests` — `pickup.md`
- **L3 Pickup Persons (siswa)** — `/pickup` — Student — `student-pick-up-persons` — `pickup.md`

**L2 6.3 Resource Sharing**
- **L3 File Sharing** — `/file-sharing/academic-department-files`, `/file-sharing/subject-files` — Admin, Teacher — `academic-department-file`, `subject-file`, `files` — `file-sharing.md`
- **L3 Media Storage (!)** — `/media-storage` — Admin — `media-storage` — `media-storage.md`

---

# 7. Finance

**L2 7.1 Product & Pricing** — katalog biaya.
- **L3 Penalty** — `/penalty-setting` — Admin — `master-penalty-setting` — `finance.md`
- **L3 Product (Category, Template, Type, List)** — `/product-category`, `/product-template`, `/product-type`, `/product-list` — Admin — `product-*`, `master-product*`, `one-time-product`, `semestral-price` — `products.md`, `finance.md`
- **L3 Master Account & Currency** — `/master-accounts` — Admin — `master-account`, `currency` — `finance.md`

**L2 7.2 Billing & Payment**
- **L3 Student Billings** — `/student-billings` — Admin — `billing`, `/billings` — `student-billing.md`
- **L3 Invoices** — `/invoices` — Admin — `invoice`, `/invoices/:id/payment-history` — `invoices.md`
- **L3 Payment List** — `/payments` — Admin — `payment`, `/payments/cancel/:id` — `finance.md`
- **L3 Installment Requests** — `/installment-requests` — Admin — `installment-request` — `student-billing.md`
- **L3 Billing Report** — `/billing-report-product` — Admin — `billing-report` — `finance.md`

**L2 7.3 Discounts & Adjustments**
- **L3 Discounts (master)** — `/discounts` — Admin — `master-discount*` — `discounts.md`
- **L3 Student Discounts** — `/student-discounts` — Admin — `discounted-product`, `price-modification` — `discounts.md`
- **L3 Promo & Merchant Discount Rate** — `/promos`, `/merchant-discount-rate` — Admin — `promo`, `master-merchant-discount-rate` — —

**L2 7.4 Wallet & Refund**
- **L3 Refund Request** — `/refund-requests` — Admin — `refund-request` — `finance.md`
- **L3 Wallets & Virtual Account** — `/wallets`, `/virtual-accounts` — Admin — `wallet`, `family-bank-information` — `wallets.md`
- **L3 Security Deposits** — `/security-deposits` — Admin — `security-deposits` — `finance.md`
- **L3 Template (dokumen keuangan)** — `/document-templates` — Admin — `master-document-template` — `document-templates.md`

---

# 8. Credentials & Reporting

**L2 8.1 Certificates & Transcripts**
- **L3 Certificate Template** — `/certificate-templates` — Admin — `master-certificate-template`, `master-document-template` — `certificates-admin.md`
- **L3 Certificates (all types)** — `/certificates/*` — Admin — `certificates`, `student-certificates` — `certificates.md`, `certificates-admin.md`
- **L3 Transkrip Nilai** — `/student-transcripts` — Admin — `student-transcript` — `student-transcripts.md`
- **L3 My Certificate (siswa)** — `/my-certificate` — Student — `student-certificates` — `certificates.md`

**L2 8.2 Reports**
- **L3 Class Report** — `/class-report` — Admin — `reports` — `reports.md`
- **L3 Report Setting** — `/report-setting` — Admin — `report-setting` — `report-settings.md`
- **L3 Student Report** — `/student-report` — Admin — `student-report`, `reports` — `reports.md`, `report-types.md`, `yellow-reports.md`
- **L3 Report (siswa)** — `/report` — Student — `student-report`, `reports` — `reports.md`

**L2 8.3 Analytics**
- **L3 Analytics (setting, AB, principal, HoD, item analysis)** — `/analytic-setting`, `/analytic-ab`, `/analytic-principal`, `/analytic-hod`, `/sve-item-analysis-analytics` — Admin — `analytic`, `/analytics`, `/sveItemAnalysisAnswers` — `analytics.md`, `sve-item-analysis.md`

---

# 9. Administration & Configuration

**L2 9.1 Institution Setup** — kalender dan struktur sekolah.
- **L3 Academic Year** — `/academic-year` — Admin — `academic-year`, `/academicYears`, `/academicYears/weeks` — `academic-year.md`
- **L3 Branch & Campus** — `/branches`, `/campuses` — Admin — `branches`, `campuses` — `campuses.md`
- **L3 Programme & Level** — `/campus-programmes`, `/programme` — Admin — `programme`, `master-programme`, `master-level` — `programmes.md`
- **L3 Master Boards** — `/master-boards` — Admin — `master-boards` — —
- **L3 Graduation Schedule** — `/graduation-schedule` — Admin — `graduation-schedules` — `promote.md`

**L2 9.2 Academic Master Data**
- **L3 Academic Department & Classroom** — `/academic-departments`, `/classes` — Admin — `academic-department`, `classroom` — `classrooms.md`, `academic-structure.md`
- **L3 Weighted Subject Level** — `/weighted-subject-levels` — Admin — `weighted-subject-level` — `secondary-gpa.md`

**L2 9.3 Staff & Teaching Quality**
- **L3 PETALS** — `/petals-summary`, `/petals-observation`, `/epetals-dashboard` — Admin, Teacher — `petals`, `/petals/*`, `/epetals/*` — —
- **L3 Appraisal** — `/appraisal-new`, `/appraisal-summary`, `/appraisal-lock`, `/appraisal-lock/audit` — Admin, Teacher — `appraisal`, `/appraisal/reviews`, `/appraisal/locks` — —

---

## Catatan penempatan lintas domain

Beberapa menu sengaja ditempatkan tidak sesuai sidebar karena domain lebih benar:

1. **Subject/Chapter/Library** ada di sidebar "School Master Data" (admin), tapi dipindah ke Curriculum & Learning karena isinya struktur pengajaran.
2. **Academic Department & Classroom** tetap di Administration karena berfungsi sebagai master data, bukan aktivitas belajar.
3. **Certificates** ada di sidebar "Report" (admin), dipisah ke Credentials & Reporting bersama transkrip dan rapor.
4. **Analytics** dipindah ke Credentials & Reporting karena output, bukan konfigurasi.
5. **Media Storage** ditaruh di Attendance & Campus Ops, bukan Finance (posisi sidebar-nya di ujung `finaMenu`, tapi isinya operasional file).

## Application Shell (bukan node fitur)

Halaman muka portal tidak dijadikan node karena tidak menyimpan data maupun menjalankan aksi bisnis; isinya hanya agregasi angka dari domain lain.

| Halaman | Route | Portal | Sumber data |
|---|---|---|---|
| Dashboard guru | `/landing` | Teacher | agregasi `classrooms`, `assignments`, `schedule` |
| Dashboard siswa | `/dashboard` | Student | agregasi `classrooms`, `assignments`, `schedule` |

## Deprecated / Legacy

Node berikut **tidak lagi ditampilkan di peta** karena diputuskan tidak dipakai operasional (keputusan tim, 2026-10-27). Dicatat di sini agar tidak dianggap hilang.

| Menu | Route | Portal | Backend | Wiki | Catatan |
|---|---|---|---|---|---|
| Social Emotional Development (SED) | `/sed`, `/sed/add`, `/sed/:id/edit`, `/sed/:id` | Admin | `sed`, `sed-activity`, `sed-competency`, `sed-indicator`, `/sedCompetencies`, `/sedActivities` | `spr-sed.md` | Masih terpasang penuh di kode; belum dihapus dari menu, route, maupun `app.module.ts`. |
| Student Progress Report (SPR) | `/spr` | Admin | `spr-component`, `spr-grade-master-subject`, `spr-grade-setting`, `/sprComponents` | `spr-sed.md` | Sama seperti SED: masih aktif di kode tapi tidak dipakai lagi. |
