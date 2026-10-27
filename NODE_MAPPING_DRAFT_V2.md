# Yggdrasil Node Mapping — Flow-Based Draft (v2)

Draft untuk review. Versi ini **menggantikan** draft menu-first (yang disimpan sebagai `NODE_MAPPING_MENU_DRAFT.md`).

Perubahan pendekatan: node level-1 **tidak lagi mengikuti sidebar** (Admin/Teacher/Student), melainkan **siklus hidup siswa** sesuai praktik SIS/ERP pendidikan. Portal (Admin/Teacher/Student) dipakai sebagai **tag audiens** per node, bukan cabang utama.

## Dasar riset

Model domain diambil dari sumber SIS/ERP dan standar interoperabilitas:

- **Archway** memakai alur eksplisit Prospect → Applicant → Student → Graduating → Alumnus, dengan modul Admissions, Enrolment, SIS Core, Examination, Student Finance, Graduation, Alumni.
- **ITEMS** memisahkan domain dengan prinsip "one accountable source per record": Institution, Admissions, Student Lifecycle, Curriculum, Registration, Assessment, Finance, Services, Credentials.
- **UniversiTools SIS** menyusun modul berurutan dari Admissions & Enrollment sampai Integrations.
- **1EdTech** menetapkan batas domain: OneRoster (roster + grade), Caliper (analytics), QTI (assessment), Common Cartridge (content), LTI (tool), Edu-API (pertukaran data SIS).
- **Catatan kejujuran:** IEEE 1484.1 LTSA **tidak** bisa saya verifikasi dari sumber primer (halaman resmi 404). Isinya tidak dipakai sebagai rujukan di dokumen ini.

## Keputusan yang sudah diambil

1. **Admission dipisah sendiri** menjadi domain level-1, bukan digabung ke Identity & Enrollment.
2. **Conduct masuk Teaching & Assessment**, karena conduct dihitung jadi nilai (`FtpGradeSetting` menyimpan bobot `always` / `mostOfTheTime` / `sometimes` / `lessObserved` per level, term, tahun ajaran). Sanksi/poin disiplin (`discipline`, `secondary-discipline-reduction`, `secondary-discipline-discount-reduction`) tetap di domain ini sebagai sub-node "Discipline & Sanctions" karena satu alur kerja dengan conduct di UI admin.

## 9 Domain level-1

| # | Domain | Cakupan | Tag audiens utama |
|---|---|---|---|
| 1 | Admission | Prospect → applicant → offered. Pendaftaran, offer, verifikasi dokumen, placement test. | Admin, Teacher |
| 2 | Identity & Enrollment | Profil siswa & wali, penempatan kelas, transfer, promosi, cuti, karyawan, akses. | Admin |
| 3 | Curriculum & Learning | Subject, chapter, library, SOW, lesson plan, material, assignment, kalender. | Admin, Teacher, Student |
| 4 | Teaching & Assessment | Gradebook, SVE, Cambridge, LO, moderation, conduct, discipline, SPR/SED. | Admin, Teacher |
| 5 | Co-Curricular | CCA, registrasi CCA, LEAPS, badges, medali. | Admin, Teacher, Student |
| 6 | Attendance & Campus Operations | Absensi, keterlambatan, penjemputan, pelepasan, gate, file sharing, media. | Admin, Teacher, Student |
| 7 | Finance | Produk, tagihan, invoice, pembayaran, diskon, wallet, deposit, refund. | Admin |
| 8 | Credentials & Reporting | Certificate, transkrip, rapor, analytics, sertifikat siswa. | Admin, Teacher, Student |
| 9 | Administration & Configuration | Master data, user & role, appraisal, PETALS, kalender akademik. | Admin |

## Cara baca

Setiap domain berisi tabel: **Node (menu frontend)** · **Route** · **Portal** · **Backend (module / endpoint)** · **Wiki**. Deskripsi domain ditulis di paragraf pembuka; deskripsi per-node ada di kolom "Node" bila perlu penjelasan.

Tanda `(!)` = item yang masih perlu keputusan lanjutan.

---

## 1. Admission

Siklus awal siswa: calon mendaftar, dokumen diverifikasi, placement test dijadwalkan, lalu offer diterbitkan. Setelah offer diterima, siswa berpindah ke domain **Identity & Enrollment**. Domain ini dipisah karena funnel admission punya ritme kerja sendiri (periode pendaftaran, gelombang offer) yang tidak mengikuti tahun ajaran berjalan.

| Node (menu frontend) | Route | Portal | Backend | Wiki |
|---|---|---|---|---|
| Student Admission — formulir & daftar pendaftar | `/admissions` | Admin | `student-admission`, `/studentAdmissions` | `student-admission.md`, `admissions.md` |
| Offer Admission — surat penawaran & preview PDF | `/offer-admissions` | Admin | `offer-admission`, `/offerAdmissions`, `/offerAdmissions/previewPdf` | `offer-admission.md` |
| Document Verification — verifikasi berkas & agreement | `/document-verification` | Admin | `admission-document`, `admission-agreement`, `/admissionDocuments`, `/admissionAgreements` | `document-verification.md` |
| Placement Test — jadwal, attempt, hasil | `/placement-test-schedules` | Admin, Teacher | `placement-test*`, `/placementTestSchedules`, `/placementTestResults`, `/placementTestAttempts` | `placement-tests.md` |
| Placement Test Result — input hasil oleh guru | `/placement-test-results` | Teacher | `placement-test-results`, `/placementTestResults/bulk` | `placement-tests.md` |
| Lead Generation (!) — modul `leadgen` ada di backend, dugaan belum ada menu khusus | — | Admin | `leadgen` | `admissions.md` |

---

## 2. Identity & Enrollment

Identitas siswa dan wali, penempatan ke kelas per tahun ajaran, transfer antar kelas/kampus, promosi, cuti, serta identitas staf yang menjadi aktor sistem. Ini "sumber kebenaran" untuk siapa-siapa saja yang ada di sistem.

| Node (menu frontend) | Route | Portal | Backend | Wiki |
|---|---|---|---|---|
| Student — daftar & profil siswa | `/students` | Admin | `students`, `/students`, `/students/:id` | `students.md` |
| Parents — daftar wali & relasi ke siswa | `/parents` | Admin | `parents`, `/parents`, `/parents/student/:studentId` | `parents.md` |
| Class in Year — pembagian kelas per tahun ajaran | `/class-in-year` | Admin | `class-year`, `/classYears`, `/classYears/:id` | `class-in-year.md` |
| Student Transfer — pindah kelas/kampus | `/class-in-year` (aksi transfer) | Admin | `/classYears/transfer` | `student-transfer.md` |
| Promote Student — kenaikan kelas akhir tahun | `/promote` | Admin | `promote`, `/classYears/transfer` | `promote.md` |
| Streaming & Promotion — dari sisi guru wali | `/streaming-and-promotion` | Teacher | `promote`, `/classYears/transfer` | `promote.md` |
| Leaves — cuti/izin siswa | `/leaves` | Admin | `leaves`, `/leaves` | — |
| Leave Form / Leave Requests — cuti guru | `/leave-form`, `/leave-requests` | Teacher | `leaves`, `/leaves` | — |
| Employee — organisasi, jabatan, daftar karyawan | `/organizations`, `/positions`, `/employees` | Admin | `organizations`, `positions`, `position-scope`, `employees`, `employee-identities`, `employee-positions` | `employees.md`, `identity.md` |
| Access Rights — matriks role & permission | `/access-rights` | Admin | `user-role`, `casl`, `user-ability`, `/userRole`, `/userRole/user/permissions` | `access-rights.md`, `access.md`, `rules.md` |

---

## 3. Curriculum & Learning

Struktur pengajaran: mata pelajaran, chapter, lesson, SOW, lesson plan, material, assignment, dan kalender. Ini domain yang dipakai guru untuk mengajar dan siswa untuk belajar.

| Node (menu frontend) | Route | Portal | Backend | Wiki |
|---|---|---|---|---|
| Master Subject — katalog mata pelajaran | `/master-subjects` | Admin | `master-subjects`, `/masterSubjects`, `/masterSubjectCoordinators` | `academic-structure.md` |
| Subject — mapel per tahun ajaran | `/subjects` | Admin | `subjects`, `/subjects`, `/subjectYears` | `subject-in-year.md` |
| Subject in Year — mapel yang diajarkan per tahun | `/subject-in-year` | Admin | `subject-year`, `/subjectYears` | `subject-in-year.md` |
| Subject Chapter — bab mapel | `/subject-chapters` | Admin | `subject-chapters`, `/subjectChapters` | `academic-structure.md` |
| Subject Library — pustaka materi & urutan lesson | `/subject-libraries` | Admin | `subject-libraries`, `/subjectLibraries`, `/subjectLibraries/reorderLessons` | `academic-structure.md` |
| SOW — daftar & komponen silabus | `/sow` | Admin | `sow`, `syllabus`, `syllabus-component`, `/sow`, `/syllabus` | `sow.md` |
| Scheme of Works — SOW versi guru | `/sows` | Teacher | `sow`, `/sow` | `sow.md` |
| Lesson Plan — editor, library, file library, no submission | `/lesson-plan`, `/lesson-plan/library`, `/lesson-plan/file-library`, `/lesson-plan/no-submission` | Admin, Teacher | `lesson-plan`, `lessons`, `material`, `/lesson-plans`, `/lesson-plans/library`, `/materials` | `academic-structure.md` |
| Resources — pustaka materi per mapel & chapter | `/resources` | Teacher | `subject-libraries`, `lessons`, `topics`, `/subjectLibraries`, `/lessons`, `/topics` | `academic-structure.md` |
| Assignments — tugas & submission | `/assignments` | Teacher, Student | `assign-assignment`, `student-assignment`, `/assignments`, `/assignments/teacher`, `/assignments/student` | — |
| My Subjects — mapel & drill-down topik | `/subjects` | Student | `subject-year`, `topics`, `lessons`, `/subjectYears` | `academic-structure.md` |
| Subject Library — pustaka materi untuk siswa | `/subjectLibrary` | Student | `subject-libraries`, `lessons`, `/subjects/subjectLibrary` | `academic-structure.md` |
| Classroom — kelas siswa, materi, aktivitas | `/classroom` | Student | `class-year`, `classroom`, `/classrooms` | `class-in-year.md` |
| Classrooms — daftar kelas yang diampu | `/classrooms` | Teacher | `class-year`, `classroom`, `/classYears` | `class-in-year.md` |
| Calendar — kalender akademik | `/calendar` | Teacher, Student | `schedule`, `/schedules` | — |

---

## 4. Teaching & Assessment

Penilaian akademik dan perilaku. Mencakup gradebook, ujian SVE, Cambridge, learning outcome, moderasi, serta **conduct** yang diukur dengan skala (always / most of the time / sometimes / less observed) dan **discipline** yang memotong poin karena pelanggaran. Conduct dan discipline diletakkan berdampingan karena di UI admin keduanya berada dalam satu cabang kerja yang sama.

| Node (menu frontend) | Route | Portal | Backend | Wiki |
|---|---|---|---|---|
| Grading Guide — panduan & skala nilai | `/grading-guides` | Admin | `grading-guides`, `/gradingGuides`, `/bandings` | `thresholds.md` |
| Default Grade Weights — bobot default | `/default-grade-weights` | Admin | `defaultGradeWeights`, `/defaultGradeWeights` | — |
| Grade Book Settings — konfigurasi gradebook | `/grade-books` | Admin | `gradebook`, `/gradebookTables`, `/gradebookExams`, `/gradeSchema` | `gradebooks.md` |
| Secondary Grade Weights / GPA Scales / GPA Subject Units | `/secondary-grade-weights`, `/secondary-gpa-gs`, `/secondary-gpa-su` | Admin | `secondary-grade-weight`, `secondary-gpa-*`, `/secondaryGradeWeights`, `/gpaGradingScales`, `/gpaSubjectUnits` | `secondary-gpa.md` |
| LO Library & LO Analyses — bank & analisis learning outcome | `/learning-outcomes`, `/learning-outcome-analyses` | Admin | `learning-outcome`, `learning-indicator`, `/learningOutcomes`, `/learningOutcomeAnalyses`, `/learningOutcomeAnalyses/syncGrades` | `lo-settings.md` |
| LO Grade Settings & LO in Year | `/learning-outcome-grade-settings`, `/learning-outcome-in-years` | Admin | `lo-grade-setting`, `learning-outcome-year`, `/loGradeSettings`, `/learningOutcomeYears` | `lo-settings.md` |
| Threshold IGCSE/A Level & AS Prelim | `/threshold`, `/threshold-as-prelim` | Admin | `threshold`, `/threshold`, `/threshold/active`, `/threshold/subject/:subjectId` | `thresholds.md`, `cambridge.md`, `prelims.md` |
| Student Cambridge Actual Grade — nilai Cambridge aktual | `/student-cambridge-actual-grade` | Admin | `student-cambridge-grade`, `/student-cambridge-grade/*`, `/grade-moderation/bulk-update` | `cambridge.md`, `cambridge-pum.md` |
| Moderation — add & list sesi moderasi | `/moderation/add`, `/moderation/list` | Admin | `grade-moderation`, `/grade-moderation`, `/grade-moderation-fye-mye/*` | `grade-moderation.md` |
| SVE — komponen, daftar, deadline, jadwal, cetak, cover, report, label, errata, BMT, box | `/sve-component`, `/sve-list`, `/sve-deadline`, `/sve-exam-timetable`, `/sve-printing-request`, `/sve-cover-template`, `/sve-cover-page`, `/sve-report`, `/sve-submission-summary`, `/sve-label`, `/sve-errata-list`, `/sve-bmt-week`, `/sve-box` | Admin | `sve`, `sve-*`, `bmt-weeks`, `master-sve-*`, `/masterSveComponents`, `/sves`, `/sveDeadlines`, `/sveExamTimetableSession`, `/svePrintingRequests`, `/sveCoverTemplates`, `/sveCoverPages`, `/sveReports`, `/sveExamTypeHistories`, `/sveErrataList`, `/bmtWeeks`, `/sveDispatchesBoxes` | `sve*.md` (7 halaman) |
| SVE — assignment, input nilai, item analysis, past paper | `/sves`, `/grade-input/:id`, `/item-analysis-analytics/:id`, `/sves-past-paper/:id` | Teacher | `sve`, `sve-item-analysis`, `/sves`, `/grades/bulk`, `/sveItemAnalysisAnswers` | `sve.md`, `sve-grade-input.md`, `sve-item-analysis.md`, `sve-files.md` |
| BMT File & Exam Supporting File Download | `/bmt-files/:id`, `/exam-supporting-files/:id` | Teacher | `bmt-weeks`, `sve-files`, `/files/sve` | `sve-files.md` |
| E-Badges — input e-badges (fail-to-perform conduct) | `/ebadges` | Teacher | `ftp`, `student-ftp-conduct`, `/ftps`, `/ftpComponents`, `/studentFtpConducts` | `cca.md` |
| E-Badges Grade Setting — bobot conduct (always/most/sometimes/less) | `/ebadges-grade-setting` | Admin | `ftp-grade-setting`, `/ftpGradeSettings` | — |
| Gradebook — nilai utama per subject year | `/gradebook` | Teacher | `gradebook`, `/gradebookTables`, `/grades` | `gradebooks.md` |
| Secondary Gradebook & DCA | `/secondary-gradebook`, `/dca` | Teacher | `secondary-gradebook`, `/secondaryGradeWeights`, `/gradeSchema`, `/dca/rubrics` | `secondary-gradebook.md` |
| IGCSE / A / AS Level Gradebook | `/cambridge-gradebook/{igcse,a-level,as-level}` | Teacher | `student-cambridge-grade`, `/student-cambridge-grade/*` | `cambridge.md` |
| Form Class — Remark (catatan perilaku siswa) | `/remark` | Teacher | `remark`, `/remarks`, `/conducts/bulk` | `students.md` |
| Conduct — input penilaian conduct per term | `/conduct` | Teacher | `conduct`, `ftp`, `/studentFtpConducts` | `secondary-discipline.md` |
| Secondary Verify Conduct — verifikasi conduct SMA | `/secondary-verify-conduct` | Admin | `secondary-verify-conduct`, `/secondaryVerifyConducts/grid`, `/secondaryVerifyConducts/upsert` | `secondary-discipline.md` |
| Discipline — overview, report, tardiness, statistics | `/discipline-overview`, `/discipline`, `/tardiness`, `/discipline-statistics` | Admin, Teacher | `discipline`, `student-attendance-reports`, `/disciplines`, `/studentAttendanceReports/discipline` | `discipline.md` |
| Secondary Discipline — kategori, entri, report | `/secondary-discipline-category`, `/secondary-discipline`, `/secondary-discipline-report` | Admin | `secondary-discipline-category`, `secondary-discipline-form`, `/secondaryDisciplineCategories`, `/secondaryDisciplineForms` | `secondary-discipline.md` |
| Reduction & Discount Reduction — pengurangan poin & diskon akibat pelanggaran | `/secondary-discipline-reduction`, `/secondary-discipline-discount-reduction` | Admin | `secondary-discipline-reduction`, `secondary-discipline-discount-reduction`, `master-secondary-discipline-merit`, `/secondaryDisciplineReductions`, `/secondaryDisciplineDiscountReductions`, `/masterSecondaryDisciplineMerits` | `secondary-discipline.md` |

---

## 5. Co-Curricular

Kegiatan di luar kelas yang bisa bernilai atau berbadge: CCA, LEAPS, badges, dan medali. Catatan: CCA punya setelan nilai (`cca-grade-setting`, `cca-grade-term-setting`, `student-cca-grade`) sehingga sebagian hasilnya mengalir ke rapor, tetapi ia tetap domain sendiri karena alurnya (registrasi → penugasan → penilaian) berbeda dari asesmen mata pelajaran.

| Node (menu frontend) | Route | Portal | Backend | Wiki |
|---|---|---|---|---|
| Co-Curricular Activities (CCA) — master CCA | `/cca` | Admin | `cca`, `/cca` | `cca.md` |
| CCA Grade Settings & CCA Grade Term Setting | `/cca-grade-settings` | Admin | `cca-grade-setting`, `cca-grade-term-setting`, `/ccaGradeSettings` | `cca.md` |
| CCA In Year — list & assignment | `/cca-in-year`, `/cca-in-year-assignment` | Admin | `cca-year`, `cca-year-coordinator`, `/ccaYears`, `/ccaYearCoordinators` | `cca.md` |
| CCA Registration — rules, management, windows | `/cca-registration-rules`, `/cca-registration-management`, `/cca-registration-windows` | Admin | `cca-registration`, `cca-registration-rules`, `cca-registration-window`, `/ccaRegistrations`, `/ccaRegistrationRules`, `/ccaRegistrationWindows` | `cca.md` |
| CCA Grading — input nilai CCA | `/ccaYear` | Teacher | `cca-year`, `student-cca-grade`, `/ccaGradeSettings` | `cca.md` |
| CCA Assignment — penugasan siswa | `/ccaYearAssignment` | Teacher | `cca-year-coordinator`, `/ccaYearCoordinators` | `cca.md` |
| CCA Approvals — approval registrasi | `/ccaRegistrationApprovals` | Teacher | `cca-registration`, `/ccaRegistrations/invite`, `/ccaRegistrations/transfer` | `cca.md` |
| CCA & CCA Registration — lihat & daftar CCA | `/ccaYear`, `/cca-registration` | Student | `cca-year`, `cca-registration`, `/ccaYears`, `/ccaRegistrations` | `cca.md` |
| LEAPS Type & LEAPS Event — jenis & event LEAPS | `/leaps-type`, `/leaps-event` | Admin | `leaps-type`, `leaps-event`, `/leapsTypes`, `/leapsEvents` | `leaps.md` |
| LEAPS — catat kegiatan LEAPS siswa | `/leaps` | Teacher | `leaps-event`, `student-leaps-remark`, `/leaps/bulk`, `/leaps/countLeaps` | `leaps.md` |
| Badges — Badge Type & daftar badge | `/badge-type`, `/badges` | Admin | `badges`, `badge-types`, `/badgeTypes`, `/badges` | — |
| Medals — Medal Type & daftar medali | `/medal-type`, `/medals` | Admin | `medals`, `medal-types`, `/medalTypes`, `/medals` | `medals.md` |
| Subject Medals — medali per mapel | `/certificates/subject-medal` | Admin | `subject-medal`, `student-medal`, `/subjectMedals`, `/studentMedals` | `medals.md`, `awardees.md` |

---

## 6. Attendance & Campus Operations

Kehadiran harian, keterlambatan, alur penjemputan & pelepasan siswa, gerbang kampus, serta berbagi berkas dan penyimpanan media. Ini operasional harian yang menyentuh semua portal.

| Node (menu frontend) | Route | Portal | Backend | Wiki |
|---|---|---|---|---|
| Attendance — General Overview | `/general-overview` | Admin | `attendances`, `student-attendance-reports`, `/attendances/byAdmin`, `/studentAttendanceReports` | `attendance.md` |
| Daily Attendance | `/daily-attendance` | Admin | `daily-attendances`, `/dailyAttendances`, `/dailyAttendances/bulk` | `attendance.md` |
| Attendance Lateness — setelan keterlambatan | `/attendance-lateness` | Admin | `late-time-settings`, `/lateTimeSettings` | — |
| Check in & Check Out — gate kampus | `/checking` | Admin | `campus-gates`, `attendances`, `/campusGates`, `/attendances` | — |
| Student Pick Up & Setting — penjemputan | `/student-pick-up`, `/student-pick-up-setting` | Admin | `student-pick-up*`, `/studentPickUps`, `/studentPickUpRequests`, `/studentPickUpSettings`, `/studentPickUpPersons` | `pickup.md` |
| Release Student — pelepasan siswa | `/release-student` | Admin, Teacher | `student-pick-up-requests`, `/studentPickUpRequests` | `pickup.md` |
| Pickup Persons — daftar penjemput yang diizinkan | `/pickup` | Student | `student-pick-up-persons`, `/studentPickUpPersons` | `pickup.md` |
| Attendance Monitoring — harian & disiplin (guru) | `/attendance-monitoring`, `/attendance-monitoring/discipline` | Teacher | `attendances`, `daily-attendances`, `disciplines`, `/dailyAttendances/onClassYear` | `attendance.md`, `discipline.md` |
| File Sharing — Academic Department & Subject Files | `/file-sharing/academic-department-files`, `/file-sharing/subject-files` | Admin, Teacher | `academic-department-file`, `subject-file`, `files`, `/academicDepartmentFile`, `/subjectFile` | `file-sharing.md` |
| Media Storage — penyimpanan media (!) di nav ada di luar dropdown Finance | `/media-storage` | Admin | `media-storage`, `/mediaStorage` | `media-storage.md` |

---

## 7. Finance

Keuangan siswa dari katalog produk sampai penagihan, pembayaran, diskon, wallet, dan refund. Domain ini murni operasional keuangan; tidak mencampur master akademik.

| Node (menu frontend) | Route | Portal | Backend | Wiki |
|---|---|---|---|---|
| Penalty — setelan denda | `/penalty-setting` | Admin | `master-penalty-setting`, `/masterPenaltySettings` | `finance.md` |
| Product — Category, Template, Type, List | `/product-category`, `/product-template`, `/product-type`, `/product-list` | Admin | `product-category`, `product-template`, `master-product-type`, `master-product`, `one-time-product`, `semestral-price`, `/productCategory`, `/productTemplates`, `/masterProductTypes`, `/masterProducts`, `/oneTimeProducts`, `/semestralPrices` | `products.md`, `finance.md` |
| Master Account — akun keuangan & currency | `/master-accounts` | Admin | `master-account`, `currency`, `/masterAccounts`, `/currencies` | `finance.md` |
| Student Billings — tagihan siswa | `/student-billings` | Admin | `billing`, `/billings` | `student-billing.md` |
| Invoices — invoice & riwayat pembayaran | `/invoices` | Admin | `invoice`, `/invoices`, `/invoices/:id/payment-history` | `invoices.md` |
| Payment List — pembayaran & approval | `/payments` | Admin | `payment`, `/payments`, `/payments/cancel/:id`, `/files/proofPayment` | `finance.md` |
| Installment Requests — permintaan cicilan | `/installment-requests` | Admin | `installment-request`, `/installmentRequests` | `student-billing.md` |
| Billing Report — laporan tagihan per produk | `/billing-report-product` | Admin | `billing-report`, `/billingReports`, `/billingReports/download/excel` | `finance.md` |
| Discounts — master diskon & setelan | `/discounts` | Admin | `master-discount*`, `/masterDiscounts`, `/masterDiscountSettings` | `discounts.md` |
| Student Discounts — diskon per siswa | `/student-discounts` | Admin | `discounted-product`, `price-modification`, `/discountedProducts`, `/priceModifications` | `discounts.md` |
| Promo & Merchant Discount Rate | `/promos`, `/merchant-discount-rate` | Admin | `promo`, `master-merchant-discount-rate`, `/promos`, `/masterMerchantDiscountRates` | — |
| Refund Request — refund & approval | `/refund-requests` | Admin | `refund-request`, `/refundRequests` | `finance.md` |
| Wallets & Student Virtual Account | `/wallets`, `/virtual-accounts` | Admin | `wallet`, `family-bank-information`, `/wallets`, `/walletTransactionHistories`, `/familyBankInformations` | `wallets.md` |
| Security Deposits — deposit jaminan & refund | `/security-deposits` | Admin | `security-deposits`, `/securityDeposits/:studentId`, `/securityDeposits/refund` | `finance.md` |
| Template — template dokumen keuangan | `/document-templates` | Admin | `master-document-template`, `/masterDocumentTemplates` | `document-templates.md` |

---

## 8. Credentials & Reporting

Keluaran akhir proses belajar: sertifikat, transkrip, rapor siswa, laporan kelas, serta analytics untuk keputusan pimpinan. Mencakup juga tampilan siswa (rapor & sertifikat miliknya).

| Node (menu frontend) | Route | Portal | Backend | Wiki |
|---|---|---|---|---|
| Certificate Template — template sertifikat & dokumen | `/certificate-templates` | Admin | `master-certificate-template`, `/masterCertificateTemplates`, `/masterDocumentTemplates` | `certificates-admin.md`, `document-templates.md` |
| Certificates — completion, LO, general purpose, assign, custom, student list | `/certificates/*` | Admin | `certificates`, `student-certificates`, `/completionCertificates`, `/learningOutcomeCertificates`, `/generalPurposes`, `/studentCertificates` | `certificates.md`, `certificates-admin.md` |
| Class Report — laporan per kelas | `/class-report` | Admin | `reports` | `reports.md` |
| Report Setting — konfigurasi template laporan | `/report-setting` | Admin | `report-setting`, `/reportSettings` | `report-settings.md` |
| Student Report — rapor siswa | `/student-report` | Admin | `student-report`, `reports`, `/studentReports`, `/reports` | `reports.md`, `report-types.md`, `report-generate.md`, `report-print.md`, `primary-reports.md`, `yellow-reports.md` |
| Transkrip Nilai — transkrip nilai siswa | `/student-transcripts` | Admin | `student-transcript`, `/studentTranscripts/generate-pdf/:studentId`, `/studentTranscripts/grades/*` | `student-transcripts.md` |
| Analytics — setting, AB, principal, HoD, item analysis | `/analytic-setting`, `/analytic-ab`, `/analytic-principal`, `/analytic-hod`, `/sve-item-analysis-analytics` | Admin | `analytic`, `/analytics`, `/analytics/bulk`, `/sveItemAnalysisAnswers` | `analytics.md`, `sve-item-analysis.md` |
| Report & My Certificate — rapor & sertifikat siswa | `/report`, `/my-certificate` | Student | `student-report`, `reports`, `student-certificates` | `reports.md`, `certificates.md` |

---

## 9. Administration & Configuration

Fondasi sistem: kalender akademik, struktur kampus, master data pendukung, serta penilaian kinerja staf dan observasi pengajaran. Domain ini yang "mengatur" domain lain, bukan melayani siswa langsung.

| Node (menu frontend) | Route | Portal | Backend | Wiki |
|---|---|---|---|---|
| Academic Year — tahun ajaran & minggu efektif | `/academic-year` | Admin | `academic-year`, `/academicYears`, `/academicYears/current`, `/academicYears/weeks` | `academic-year.md` |
| Branch & Campus — struktur kampus | `/branches`, `/campuses` | Admin | `branches`, `campuses`, `/branches`, `/campuses` | `campuses.md` |
| Campus Programme & Programme & Level | `/campus-programmes`, `/programme` | Admin | `programme`, `master-programme`, `master-level`, `/programmes`, `/masterProgrammes`, `/masterLevels` | `programmes.md`, `academic-structure.md` |
| Master Boards — papan/master kurikulum | `/master-boards` | Admin | `master-boards`, `/masterBoards` | — |
| Graduation Schedule — jadwal kelulusan | `/graduation-schedule` | Admin | `graduation-schedules`, `/graduationSchedules` | `promote.md` |
| Academic Department & Classroom | `/academic-departments`, `/classes` | Admin | `academic-department`, `classroom`, `/academicDepartments`, `/classrooms` | `classrooms.md`, `academic-structure.md` |
| Weighted Subject Level — bobot level mapel | `/weighted-subject-levels` | Admin | `weighted-subject-level`, `/weightedSubjectLevel` | `secondary-gpa.md` |
| Social Emotional Development (SED) — kompetensi | `/sed` | Admin | `sed`, `/sedCompetencies`, `/sedActivities` | `spr-sed.md` |
| Student Progress Report (SPR) — komponen & grade setting | `/spr`, `/spr-grade-setting` | Admin | `spr`, `spr-grade-setting`, `/sprComponents`, `/sprGradeSettings` | `spr-sed.md` |
| PETALS — summary, observation, e-PETALS | `/petals-summary`, `/petals-observation`, `/epetals-dashboard` | Admin, Teacher | `petals`, `/petals/*`, `/epetals/summary`, `/epetals/chart`, `/petals/observations` | — |
| Appraisal — staff database, summary, lock, audit | `/appraisal-new`, `/appraisal-summary`, `/appraisal-lock`, `/appraisal-lock/audit` | Admin, Teacher | `appraisal`, `/appraisal/reviews`, `/appraisal/locks`, `/appraisal/locks/audit`, `/appraisal/summary` | — |
| Height & Weight — tinggi & berat badan siswa | `/height-and-weight` | Teacher | `health`, `/heightWeights/bulk` | — |
| Dashboard — landing guru & siswa | `/landing`, `/dashboard` | Teacher, Student | agregasi `classrooms`, `assignments`, `schedule` | — |

---

## Cross-domain flow (ringkas)

```
Admission ─(offer accepted)─► Identity & Enrollment ─► Curriculum & Learning ─► Teaching & Assessment
                                        │                        │                        │
                                        │                        ▼                        │
                                        │              Co-Curricular (registrasi→nilai)  │
                                        ▼                        │                        ▼
                              Attendance & Ops ◄────────────────┘           Credentials & Reporting
                                        │                                          ▲
                                        ▼                                          │
                                     Finance ──────────────────────────────────────┘
                            (semua domain bergantung pada Administration & Configuration)
```

---

## Pertanyaan Terbuka (lanjutan)

1. **Lead Generation** (`leadgen`) ada di backend tapi belum ketemu menu frontend-nya. Masukkan sebagai node Admission dengan route kosong, atau abaikan sampai UI-nya ada?
2. **E-Badges** muncul dua kali dengan makna berbeda: di Admin sebagai *master data* (`/ebadges` di Non Education Master Data) dan di Teacher sebagai *input nilai conduct* (`/ebadges` di menu Grade). Di draft ini keduanya masuk Teaching & Assessment. Setuju, atau master-nya pindahkan ke Co-Curricular?
3. **SPR & SED** sekarang di Administration. Padahal SPR (Student Progress Report) adalah laporan hasil belajar. Mau dipindah ke Credentials & Reporting?
4. **Height & Weight** masuk Administration karena berbasis modul `health`; padahal ini pencatatan data siswa. Pindah ke Identity & Enrollment?
5. **Analytics** di Credentials & Reporting, tapi juga bisa dibaca sebagai "administrasi". Tetap di Credentials (karena output), atau pindah ke Administration (karena input/konfigurasi)?
6. Apakah kamu mau **deskripsi per node** lebih panjang (2–3 kalimat) seperti draft menu-first, atau ringkas seperti tabel ini?
7. Route final masih relatif; apakah perlu saya ambil `basename` tiap app dan tulis path absolut?

---

## Ringkasan Cakupan

| Domain | Jumlah node (tabel) | Menu frontend tercakup |
|---|---|---|
| 1. Admission | 6 | 5 menu + 1 potensi |
| 2. Identity & Enrollment | 10 | 20+ menu (digabung) |
| 3. Curriculum & Learning | 15 | 25+ menu |
| 4. Teaching & Assessment | 21 | 45+ menu |
| 5. Co-Curricular | 12 | 18+ menu |
| 6. Attendance & Campus Ops | 10 | 12+ menu |
| 7. Finance | 15 | 20 menu |
| 8. Credentials & Reporting | 8 | 15+ menu |
| 9. Administration & Config | 12 | 20+ menu |

Total 109 node domain, mencakup seluruh 238 entri menu frontend (dengan penggabungan menu duplikat antar portal) dan tetap menampung 228 module backend sebagai referensi kolom "Backend".
