# Yggdrasil Node Mapping — Frontend-First Draft

Draft untuk review. Node utama = **menu / layar di frontend**. Backend (module NestJS, endpoint) dicatat sebagai **informasi pendukung di deskripsi**, bukan sebagai node.

Sumber struktur menu: `bbs/client/src/containers/_nav.jsx` (Admin, 171 entri), `bbs/client-teacher/src/containers/_nav.jsx` (Teacher, 56 entri), `bbs/client-student/src/containers/_nav.js` (Student, 11 entri). Sumber endpoint: `bbs/<app>/src/actions/api/*.js`. Referensi alur bisnis: `bbs-wiki/*.md`.

## Cara baca

Setiap node ditulis dengan format:

```
### <Nama Menu>
- **route**: `<path frontend>`  (base: /admin, /teacher, /student — sesuaikan dengan basename tiap app)
- **deskripsi**: apa yang dilakukan layar ini, dalam bahasa pengguna.
- **backend**: modul & endpoint utama yang dipanggil layar ini.
- **wiki**: halaman wiki pendukung (bila ada).
- **anak**: sub-menu (opsional).
```

Tanda `(!)` menandai item yang perlu keputusan review (lihat bagian "Pertanyaan Terbuka" di akhir).

---

## Root: SmartBag

- **deskripsi**: Sistem manajemen sekolah BBS. Tiga aplikasi terpisah berbagi satu backend.
- **backend**: `api_nest` (NestJS, 228 module, +/-1.195 endpoint). Aplikasi lama di `bbs/api` dicatat sebagai legacy.

### Portal: Admin (`bbs/client`)

Aplikasi staf: akademik, keuangan, data master, laporan, administrasi.

---

#### 1. Parent & Student Account
- **route**: `/students`, `/parents`
- **deskripsi**: Daftar dan detail siswa serta orang tua/wali. Titik masuk utama untuk melihat profil siswa, riwayat kelas, dan menghubungkan akun parent.
- **backend**: module `students`, `parents`, `student-admission`. Endpoint `/students`, `/students/:id`, `/parents`, `/parents/student/:studentId`, `/classYears/transfer`.
- **wiki**: `students.md`, `parents.md`, `student-transfer.md`
- **anak**:
  - **Student** — `/students` — daftar siswa, filter kelas/status. Backend: `students`.
  - **Parents** — `/parents` — daftar wali, pencarian by nomor identitas. Backend: `parents`.

---

#### 2. School Master Data
- **route**: `/academic-year` (induk dropdown)
- **deskripsi**: Data induk struktur sekolah yang dipakai lintas modul: tahun ajaran, cabang, kampus, program kampus, papan, chapter & library mata pelajaran, jadwal kelulusan.
- **backend**: module `academic-year`, `branches`, `campuses`, `programme`, `master-boards`, `subject-chapters`, `subject-libraries`, `graduation-schedules`.
- **wiki**: `academic-year.md`, `campuses.md`, `programmes.md`, `master-data.md`
- **anak**:
  - **Academic Year** — `/academic-year` — tahun ajaran dan minggu efektif. Backend: `/academicYears`, `/academicYears/current`, `/academicYears/weeks`. Wiki: `academic-year.md`
  - **Branch** — `/branches` — cabang sekolah. Backend: `/branches`. Wiki: `campuses.md`
  - **Campus** — `/campuses` — kampus dalam cabang. Backend: `/campuses`. Wiki: `campuses.md`
  - **Campus Programme** — `/campus-programmes` — program yang dibuka di kampus. Backend: `/programmes/campus/:campusId`.
  - **Master Boards** — `/master-boards` — papan/master kurikulum. Backend: `/masterBoards`.
  - **Subject Chapter** — `/subject-chapters` — bab mata pelajaran. Backend: `/subjectChapters`.
  - **Subject Library** — `/subject-libraries` — pustaka materi pelajaran, urutan lesson. Backend: `/subjectLibraries`, `/subjectLibraries/reorderLessons`. Wiki: `academic-structure.md`
  - **Graduation Schedule** — `/graduation-schedule` — jadwal kelulusan. Backend: `/graduationSchedules`. Wiki: `promote.md`

---

#### 3. Education Master Data
- **route**: `/academic-departments` (induk dropdown)
- **deskripsi**: Data induk akademik: departemen, kelas, panduan penilaian, bobot nilai, badge & medali, mata pelajaran, learning outcome, threshold Cambridge, moderasi nilai.
- **backend**: module `academic-department`, `classroom`, `grading-guides`, `defaultGradeWeights`, `badges`, `badge-types`, `medals`, `medal-types`, `master-subjects`, `subjects`, `weighted-subject-level`, `learning-outcome`, `learning-indicator`, `threshold`, `student-cambridge-grade`, `grade-moderation`.
- **wiki**: `academic-structure.md`, `thresholds.md`, `grade-moderation.md`, `cambridge.md`, `cambridge-pum.md`, `medals.md`, `lo-settings.md`
- **anak**:
  - **Academic Department** — `/academic-departments` — departemen akademik. Backend: `/academicDepartments`.
  - **Classroom** — `/classes` — master ruang kelas. Backend: `/classrooms`. Wiki: `classrooms.md`
  - **Grading Guide** — `/grading-guides` — panduan & skala penilaian. Backend: `/gradingGuides`, `/bandings`. Wiki: `thresholds.md`
  - **Default Grade Weights** — `/default-grade-weights` — bobot nilai default. Backend: `/defaultGradeWeights`.
  - **Badges** (dropdown)
    - **Badge Type** — `/badge-type` — jenis badge. Backend: `/badgeTypes`.
    - **Badges** — `/badges` — daftar badge. Backend: `/badges`.
  - **Medals** (dropdown)
    - **Medal Type** — `/medal-type` — jenis medali. Backend: `/medalTypes`. Wiki: `medals.md`
    - **Medals** — `/medals` — daftar medali. Backend: `/medals`.
  - **Subject** (dropdown)
    - **Master Subject** — `/master-subjects` — master mata pelajaran. Backend: `/masterSubjects`, `/masterSubjectCoordinators`. Wiki: `academic-structure.md`
    - **Subject** — `/subjects` — mata pelajaran per tahun. Backend: `/subjects`, `/subjectYears`. Wiki: `subject-in-year.md`
    - **Weighted Subject Level** — `/weighted-subject-levels` — bobot level mata pelajaran. Backend: `/weightedSubjectLevel`. Wiki: lihat `secondary-gpa.md`
  - **LO Library** — `/learning-outcomes` — bank learning outcome. Backend: `/learningOutcomes`, `/learningIndicators`. Wiki: `lo-settings.md`
  - **LO Analyses** — `/learning-outcome-analyses` — analisis pencapaian LO. Backend: `/learningOutcomeAnalyses`, `/learningOutcomeAnalyses/syncGrades`. Wiki: `lo-settings.md`
  - **Threshold IGCSE/A Level** — `/threshold` — ambang nilai Cambridge. Backend: `/threshold`, `/threshold/active`. Wiki: `thresholds.md`, `cambridge.md`
  - **Threshold AS Prelim** — `/threshold-as-prelim` — ambang nilai AS preliminary. Backend: `/threshold/subject/:subjectId`. Wiki: `prelims.md`
  - **Student Cambridge Actual Grade** — `/student-cambridge-actual-grade` — input nilai Cambridge aktual per siswa. Backend: `/student-cambridge-grade/*`, `/grade-moderation/bulk-update`. Wiki: `cambridge.md`, `cambridge-pum.md`
  - **Moderation** (dropdown)
    - **Add Moderation** — `/moderation/add` — menambah sesi moderasi nilai. Backend: `/grade-moderation`. Wiki: `grade-moderation.md`
    - **Moderation List** — `/moderation/list` — daftar sesi moderasi. Backend: `/grade-moderation`, `/grade-moderation-fye-mye/*`. Wiki: `grade-moderation.md`

---

#### 4. Non Education Master Data
- **route**: `/cca` (induk dropdown)
- **deskripsi**: Data induk non-akademik: kegiatan ekstrakurikuler (CCA), e-badges, tipe LEAPS, social emotional development, student progress report.
- **backend**: module `cca`, `ftp`, `leaps-type`, `sed`, `spr`.
- **wiki**: `cca.md`, `leaps.md`, `spr-sed.md`
- **anak**:
  - **Co-Curricular Activities (CCA)** — `/cca` — master CCA. Backend: `/cca`, `/ccaGradeSettings`. Wiki: `cca.md`
  - **E-Badges** — `/ebadges` — master e-badges / fail-to-perform conduct. Backend: `/ftpComponents`, `/ftpGradeSettings`. Wiki: `cca.md`
  - **LEAPS Type** — `/leaps-type` — jenis kegiatan LEAPS. Backend: `/leapsTypes`. Wiki: `leaps.md`
  - **Social Emotional Development** — `/sed` — kompetensi SED. Backend: `/sedCompetencies`, `/sedActivities`. Wiki: `spr-sed.md`
  - **Student Progress Report** — `/spr` — komponen SPR. Backend: `/sprComponents`, `/sprGradeSettings`. Wiki: `spr-sed.md`

---

#### 5. Academic Year Data
- **route**: `/class-in-year` (induk dropdown)
- **deskripsi**: Data yang berlaku per tahun ajaran: kelas per tahun, CCA per tahun, registrasi CCA, setelan nilai (CCA, e-badges, gradebook, GPA, LO, SPR), event LEAPS, cuti, promosi siswa, subject & LO per tahun.
- **backend**: module `class-year`, `cca-year`, `cca-registration`, `cca-grade-setting`, `ftp-grade-setting`, `gradebook`, `secondary-grade-weight`, `secondary-gpa-*`, `lo-grade-setting`, `spr-grade-setting`, `leaps-event`, `leaves`, `promote`, `subject-year`, `learning-outcome-year`.
- **wiki**: `class-in-year.md`, `cca.md`, `gradebooks.md`, `secondary-gpa.md`, `lo-settings.md`, `leaps.md`, `promote.md`, `subject-in-year.md`
- **anak**:
  - **Class in Year** — `/class-in-year` — pembagian kelas per tahun ajaran. Backend: `/classYears`, `/classYears/:id`, `/classYears/transfer`. Wiki: `class-in-year.md`
  - **CCA In Year** (dropdown)
    - **CCA In Year - List** — `/cca-in-year` — daftar CCA aktif di tahun berjalan. Backend: `/ccaYears`. Wiki: `cca.md`
    - **CCA In Year - Assignment** — `/cca-in-year-assignment` — penugasan siswa ke CCA. Backend: `/ccaYearCoordinators`, `/ccaYears/:id`. Wiki: `cca.md`
  - **CCA Registration** (dropdown)
    - **Registration Rules** — `/cca-registration-rules` — aturan registrasi CCA. Backend: `/ccaRegistrationRules`. Wiki: `cca.md`
    - **Registration Management** — `/cca-registration-management` — kelola pendaftaran masuk. Backend: `/ccaRegistrations`. Wiki: `cca.md`
    - **Registration Windows** — `/cca-registration-windows` — jendela waktu pendaftaran. Backend: `/ccaRegistrationWindows`. Wiki: `cca.md`
  - **Grades** (dropdown) — (!) setelan nilai campuran, lihat Pertanyaan Terbuka #2
    - **CCA Grade Settings** — `/cca-grade-settings` — bobot/skala nilai CCA. Backend: `/ccaGradeSettings`. Wiki: `cca.md`
    - **E-Badges Grade Setting** — `/ebadges-grade-setting` — setelan nilai e-badges. Backend: `/ftpGradeSettings`.
    - **Grade Book Settings** — `/grade-books` — konfigurasi gradebook. Backend: `/gradebookTables`, `/gradebookExams`, `/gradeSchema`. Wiki: `gradebooks.md`
    - **Secondary Grade Weights** — `/secondary-grade-weights` — bobot nilai sekunder. Backend: `/secondaryGradeWeights`. Wiki: `secondary-gpa.md`
    - **Secondary GPA Grading Scales** — `/secondary-gpa-gs` — skala GPA sekunder. Backend: `/gpaGradingScales`. Wiki: `secondary-gpa.md`
    - **Secondary GPA Subject Units** — `/secondary-gpa-su` — unit mapel untuk GPA. Backend: `/gpaSubjectUnits`. Wiki: `secondary-gpa.md`
    - **LO Grade Settings** — `/learning-outcome-grade-settings` — setelan nilai LO. Backend: `/loGradeSettings`. Wiki: `lo-settings.md`
    - **SPR Grade Setting** — `/spr-grade-setting` — setelan nilai SPR. Backend: `/sprGradeSettings`. Wiki: `spr-sed.md`
  - **LEAPS Event** — `/leaps-event` — event LEAPS per tahun. Backend: `/leapsEvents`. Wiki: `leaps.md`
  - **Leaves** — `/leaves` — cuti/izin. Backend: `/leaves`.
  - **Promote Student** — `/promote` — kenaikan kelas. Backend: `/classYears/transfer`, `promote`. Wiki: `promote.md`
  - **Subject in Year** — `/subject-in-year` — mapel yang diajarkan per tahun. Backend: `/subjectYears`. Wiki: `subject-in-year.md`
  - **LO in Year** — `/learning-outcome-in-years` — LO per tahun ajaran. Backend: `/learningOutcomeYears`. Wiki: `lo-settings.md`

---

#### 6. Discipline
- **route**: `/discipline-overview`
- **deskripsi**: Disiplin & perilaku siswa: ringkasan, laporan, keterlambatan, statistik, kategori disiplin sekunder, verifikasi conduct, pengurangan/diskon dari pelanggaran.
- **backend**: module `disciplines`, `secondary-discipline-category`, `secondary-discipline-form`, `secondary-discipline-reduction`, `secondary-discipline-discount-reduction`, `secondary-verify-conduct`, `student-attendance-reports`.
- **wiki**: `discipline.md`, `secondary-discipline.md`
- **anak**:
  - **Overview** — `/discipline-overview` — dashboard disiplin.
  - **Report** — `/discipline` — laporan pelanggaran. Backend: `/disciplines`. Wiki: `discipline.md`
  - **Tardiness** — `/tardiness` — laporan keterlambatan. Backend: `/studentAttendanceReports/discipline`.
  - **Statistics** — `/discipline-statistics` — statistik disiplin.
  - **Secondary Discipline Category** — `/secondary-discipline-category` — kategori disiplin SMA. Backend: `/secondaryDisciplineCategories`. Wiki: `secondary-discipline.md`
  - **Secondary Discipline** — `/secondary-discipline` — entri disiplin SMA. Backend: `/secondaryDisciplineForms`. Wiki: `secondary-discipline.md`
  - **Secondary Discipline Report** — `/secondary-discipline-report` — laporan disiplin SMA.
  - **Secondary Verify Conduct** — `/secondary-verify-conduct` — verifikasi conduct SMA. Backend: `/secondaryVerifyConducts/grid`, `/secondaryVerifyConducts/upsert`.
  - **Discount Reduction** — `/secondary-discipline-discount-reduction` — diskon akibat conduct. Backend: `/secondaryDisciplineDiscountReductions`.
  - **Reduction** — `/secondary-discipline-reduction` — pengurangan poin/merit. Backend: `/secondaryDisciplineReductions`, `/masterSecondaryDisciplineMerits`.

---

#### 7. SOW (Scheme of Work)
- **route**: `/sow`
- **deskripsi**: Rencana kerja semester per mata pelajaran: daftar SOW dan komponennya.
- **backend**: module `sow`, `syllabus`, `syllabus-component`. Endpoint `/sow`, `/syllabus`, `/syllabusComponent/*`.
- **wiki**: `sow.md`, `academic-structure.md`
- **anak**:
  - **List & Component** — `/sow` — daftar SOW dan komponen silabus.

---

#### 8. Lesson Plan
- **route**: `/lesson-plan`
- **deskripsi**: Rencana pembelajaran guru: dokumen lesson plan, pustaka, file library, serta daftar yang belum submit.
- **backend**: module `lesson-plan`, `lessons`, `material`, `files`. Endpoint `/lesson-plans`, `/lesson-plans/:id/comments`, `/lesson-plans/:id/copy`, `/lessons`, `/materials`.
- **wiki**: `academic-structure.md`
- **anak**:
  - **Lesson Plan** — `/lesson-plan` — daftar & editor lesson plan.
  - **Library** — `/lesson-plan/library` — pustaka lesson plan.
  - **File Library** — `/lesson-plan/file-library` — file pendukung.
  - **No Submission** — `/lesson-plan/no-submission` — yang belum mengumpulkan.

---

#### 9. PETALS
- **route**: `/petals-summary`
- **deskripsi**: Observasi pengajaran & laporan PETALS/e-PETALS untuk guru.
- **backend**: module `petals`. Endpoint `/petals/*`, `/epetals/summary`, `/epetals/chart`.
- **anak**:
  - **Summary Report** — `/petals-summary` — ringkasan observasi.
  - **Observation** — `/petals-observation` — form observasi kelas.
  - **E-PETALS** — `/epetals-dashboard` — dashboard e-PETALS.

---

#### 10. Appraisal
- **route**: `/appraisal-new`
- **deskripsi**: Penilaian kinerja guru/staf: database staf, laporan ringkasan, kunci/buka penilaian, audit kunci.
- **backend**: module `appraisal`. Endpoint `/appraisal/reviews`, `/appraisal/locks`, `/appraisal/locks/audit`.
- **anak**:
  - **Staff Database** — `/appraisal-new` — data penilaian staf.
  - **Summary Report** — `/appraisal-summary` — laporan ringkasan.
  - **Lock/Unlock** — `/appraisal-lock` — kunci penilaian.
  - **Lock Audit** — `/appraisal-lock/audit` — jejak audit kunci.

---

#### 11. SVE (School Verification Exam)
- **route**: `/sve-component`
- **deskripsi**: Ujian verifikasi sekolah: komponen, daftar ujian, deadline, jadwal ujian, permintaan cetak, cover page, laporan, ringkasan submission, label, errata, minggu BMT, kotak distribusi.
- **backend**: module `sve`, `sve-*` (component, deadline, exam-timetable, printing-request, cover-page, cover-template, report, errata-list, dispatch-box), `bmt-weeks`, `master-sve-*`.
- **wiki**: `sve.md`, `sve-files.md`, `sve-grade-input.md`, `sve-item-analysis.md`, `sve-lock.md`, `sve-printing.md`, `sve-timetable.md`
- **anak**:
  - **SVE Component** — `/sve-component` — komponen ujian. Backend: `/masterSveComponents`.
  - **SVE List** — `/sve-list` — daftar ujian. Backend: `/sveExamTypes`, `/sves`. Wiki: `sve.md`
  - **SVE Deadline** — `/sve-deadline` — batas waktu. Backend: `/sveDeadlines`, `/sveDeadlines/:id/lockUnlock`. Wiki: `sve-lock.md`
  - **SVE Exam Timetable** — `/sve-exam-timetable` — jadwal ujian. Backend: `/sveExamTimetableSession`, `/sveExamTimetableNotes`. Wiki: `sve-timetable.md`
  - **SVE Printing Request** — `/sve-printing-request` — permintaan cetak naskah. Backend: `/svePrintingRequests`. Wiki: `sve-printing.md`
  - **SVE Cover Page Template** — `/sve-cover-template` — template cover. Backend: `/sveCoverTemplates`, `/masterSvePaperEnvelopes`.
  - **SVE Cover Page** — `/sve-cover-page` — cover per ujian. Backend: `/sveCoverPages`.
  - **SVE Report** — `/sve-report` — laporan hasil. Backend: `/sveReports`, `/sveReports/printingLabels`.
  - **SVE Submission Summary** — `/sve-submission-summary` — ringkasan pengumpulan. Backend: `/sveExamTypeHistories`.
  - **SVE Labels** — `/sve-label` — label cetak.
  - **SVE Errata List** — `/sve-errata-list` — daftar errata. Backend: `/sveErrataList`.
  - **SVE BMT Week List** — `/sve-bmt-week` — minggu BMT. Backend: `/bmtWeeks`.
  - **SVE Box** — `/sve-box` — kotak distribusi naskah. Backend: `/sveDispatchesBoxes`.

---

#### 12. Report
- **route**: `/certificate-templates`
- **deskripsi**: Pelaporan & sertifikat: template sertifikat, berbagai jenis sertifikat, laporan kelas, setelan laporan, laporan siswa, transkrip nilai.
- **backend**: module `master-certificate-template`, `certificates`, `student-certificates`, `reports`, `report-setting`, `student-report`, `student-transcript`, `yellow-report`, `merit-report`.
- **wiki**: `reports.md`, `report-types.md`, `report-generate.md`, `report-print.md`, `report-settings.md`, `certificates.md`, `certificates-admin.md`, `student-transcripts.md`, `primary-reports.md`, `yellow-reports.md`
- **anak**:
  - **Certificates** (dropdown)
    - **Certificate Template** — `/certificate-templates` — template sertifikat. Backend: `/masterCertificateTemplates`, `/masterDocumentTemplates`. Wiki: `certificates-admin.md`
    - **Completion Certificates** — `/certificates/completion-certificate` — sertifikat kelulusan. Backend: `/completionCertificates`. Wiki: `certificates.md`
    - **Subject Medals** — `/certificates/subject-medal` — medali mapel. Backend: `/subjectMedals`, `/studentMedals`. Wiki: `medals.md`, `awardees.md`
    - **Learning Outcome Certificate** — `/certificates/learning-outcome` — sertifikat LO. Backend: `/learningOutcomeCertificates`.
    - **General Purpose** — `/certificates/general-purpose` — sertifikat umum. Backend: `/generalPurposes`.
    - **Assign Certificate** — `/certificates/assign` — penugasan sertifikat. Backend: `/studentCertificates`.
    - **Custom Certificate** — `/certificates/custom` — sertifikat kustom. Backend: `/studentCertificates/custom`.
    - **Student List Certificate** — `/certificates/student-list` — daftar sertifikat siswa.
  - **Class Report** — `/class-report` — laporan per kelas. Wiki: `reports.md`
  - **Report Setting** — `/report-setting` — konfigurasi template laporan. Backend: `/reportSettings`. Wiki: `report-settings.md`
  - **Student Report** — `/student-report` — rapor siswa. Backend: `/studentReports`, `/reports`. Wiki: `reports.md`
  - **Transkrip Nilai** — `/student-transcripts` — transkrip nilai. Backend: `/studentTranscripts/generate-pdf/:studentId`, `/studentTranscripts/grades/*`. Wiki: `student-transcripts.md`

---

#### 13. Setting
- **route**: `/access-rights`
- **deskripsi**: Hak akses & role pengguna.
- **backend**: module `user-role`, `casl`, `user-ability`, `user-datatables`. Endpoint `/userRole`, `/userRole/user/permissions`, `/userDatatables`.
- **wiki**: `access-rights.md`, `access.md`, `rules.md`
- **anak**:
  - **Access Rights** — `/access-rights` — matriks role & permission.

---

#### 14. File Sharing
- **route**: `/file-sharing/academic-department-files`
- **deskripsi**: Berbagi berkas per departemen akademik dan per mata pelajaran.
- **backend**: module `academic-department-file`, `subject-file`, `files`, `media-storage`.
- **wiki**: `file-sharing.md`, `media-storage.md`
- **anak**:
  - **Academic Department Files** — `/file-sharing/academic-department-files` — berkas departemen. Backend: `/academicDepartmentFile`.
  - **Subject Files** — `/file-sharing/subject-files` — berkas mapel. Backend: `/subjectFile`.

---

#### 15. Attendance
- **route**: `/general-overview`
- **deskripsi**: Kehadiran siswa: ringkasan umum, absensi harian, penjemputan siswa, setelan penjemputan, keterlambatan, check-in/check-out, pelepasan siswa.
- **backend**: module `attendances`, `daily-attendances`, `late-time-settings`, `student-pick-up*`, `campus-gates`, `student-attendance-reports`.
- **wiki**: `attendance.md`, `pickup.md`
- **anak**:
  - **General Overview** — `/general-overview` — ringkasan kehadiran. Backend: `/attendances/byAdmin`, `/studentAttendanceReports`. Wiki: `attendance.md`
  - **Daily Attendance** — `/daily-attendance` — absensi harian. Backend: `/dailyAttendances`, `/dailyAttendances/bulk`. Wiki: `attendance.md`
  - **Student Pick Up** — `/student-pick-up` — penjemputan siswa. Backend: `/studentPickUps`, `/studentPickUpRequests`. Wiki: `pickup.md`
  - **Student Pick Up Setting** — `/student-pick-up-setting` — setelan penjemputan. Backend: `/studentPickUpSettings`, `/studentPickUpPersons`. Wiki: `pickup.md`
  - **Attendance Lateness** — `/attendance-lateness` — setelan keterlambatan. Backend: `/lateTimeSettings`.
  - **Check in & Check Out** — `/checking` — gate check-in/out. Backend: `/campusGates`, `/attendances`.
  - **Release Student** — `/release-student` — pelepasan siswa. Backend: `/studentPickUpRequests`.

---

#### 16. Analytics
- **route**: `/analytic-setting`
- **deskripsi**: Antarmuka analitik: setelan analitik, analitik AB, principal, HoD, dan analitik item analysis.
- **backend**: module `analytic`. Endpoint `/analytics`, `/analytics/bulk`.
- **wiki**: `analytics.md`
- **anak**:
  - **Analytic Setting** — `/analytic-setting` — konfigurasi analitik.
  - **AB Analytic** — `/analytic-ab` — analitik tingkat AB.
  - **Principal Analytic** — `/analytic-principal` — analitik pimpinan.
  - **HoD Analytic** — `/analytic-hod` — analitik Head of Department.
  - **Item Analysis Analytics** — `/sve-item-analysis-analytics` — analitik butir soal. Backend: `/sveItemAnalysisAnswers`. Wiki: `sve-item-analysis.md`

---

#### 17. Admission
- **route**: `/admissions`
- **deskripsi**: Penerimaan siswa baru: pendaftaran, penawaran admission, verifikasi dokumen, jadwal placement test. (!) Menurut struktur menu, ini milik portal Admin (bukan master data akademik) — lihat Pertanyaan Terbuka #1.
- **backend**: module `student-admission`, `offer-admission`, `admission-document`, `admission-agreement`, `placement-test*`, `leadgen`.
- **wiki**: `admissions.md`, `student-admission.md`, `offer-admission.md`, `document-verification.md`, `placement-tests.md`
- **anak**:
  - **Student Admission** — `/admissions` — formulir & daftar pendaftar. Backend: `/studentAdmissions`. Wiki: `student-admission.md`
  - **Offer Admission** — `/offer-admissions` — surat penawaran. Backend: `/offerAdmissions`, `/offerAdmissions/previewPdf`. Wiki: `offer-admission.md`
  - **Document Verification** — `/document-verification` — verifikasi dokumen. Backend: `/admissionDocuments`, `/admissionAgreements`. Wiki: `document-verification.md`
  - **Placement Test** — `/placement-test-schedules` — jadwal & hasil placement test. Backend: `/placementTestAttempts`, `/placementTestResults`, `/placementTestSchedules`. Wiki: `placement-tests.md`

---

#### 18. Employee
- **route**: `/organizations`
- **deskripsi**: Data karyawan: organisasi, jabatan, daftar karyawan, identitas, penugasan.
- **backend**: module `organizations`, `positions`, `position-scope`, `employees`, `employee-identities`, `employee-positions`, `head-departments`, `department`, `board-teachers`, `teachers`, `admin`.
- **wiki**: `employees.md`, `identity.md`
- **anak**:
  - **Organization** — `/organizations` — struktur organisasi. Backend: `/organizations`. Wiki: `employees.md`
  - **Positions** — `/positions` — jabatan & scope. Backend: `/positions`, `/positionScopes`. Wiki: `employees.md`
  - **List** — `/employees` — daftar karyawan. Backend: `/employees`, `/employeePositions`, `/employeeIdentities`. Wiki: `employees.md`

---

#### 19. Programme & Level
- **route**: `/programme`
- **deskripsi**: Program studi dan level/jenjang.
- **backend**: module `programme`, `master-programme`, `master-level`, `programme-academic-department`.
- **wiki**: `programmes.md`, `academic-structure.md`
- **anak**:
  - **Programme & Level** — `/programme` — gabungan program & level. Backend: `/programmes`, `/masterProgrammes`, `/masterLevels`.

---

#### 20. Product
- **route**: `/penalty-setting`
- **deskripsi**: Katalog produk & biaya: penalti, kategori, template, tipe, daftar produk.
- **backend**: module `master-penalty-setting`, `product-category`, `product-template`, `master-product-type`, `master-product`, `one-time-product`, `semestral-price`.
- **wiki**: `products.md`, `finance.md`
- **anak**:
  - **Penalty** — `/penalty-setting` — setelan denda. Backend: `/masterPenaltySettings`. Wiki: `finance.md`
  - **Category** — `/product-category` — kategori produk. Backend: `/productCategory`.
  - **Template** — `/product-template` — template produk. Backend: `/productTemplates`.
  - **Type** — `/product-type` — tipe produk. Backend: `/masterProductTypes`.
  - **List** — `/product-list` — daftar produk. Backend: `/masterProducts`, `/oneTimeProducts`, `/semestralPrices`. Wiki: `products.md`

---

#### 21. Finance
- **route**: `/master-accounts`
- **deskripsi**: Keuangan siswa: master akun, tagihan siswa, invoice, pembayaran, diskon, cicilan, template dokumen, laporan tagihan, virtual account, diskon/promo/refund, merchant discount rate, wallet, security deposit, currency.
- **backend**: module `master-account`, `billing`, `invoice`, `payment`, `master-discount*`, `discounted-product`, `installment-request`, `master-document-template`, `billing-report`, `promo`, `refund-request`, `master-merchant-discount-rate`, `wallet`, `security-deposits`, `currency`, `family-bank-information`, `price-modification`.
- **wiki**: `finance.md`, `student-billing.md`, `invoices.md`, `discounts.md`, `wallets.md`, `document-templates.md`
- **anak**:
  - **Master Account** — `/master-accounts` — akun keuangan. Backend: `/masterAccounts`, `/currencies`. Wiki: `finance.md`
  - **Student Billings** — `/student-billings` — tagihan siswa. Backend: `/billings`. Wiki: `student-billing.md`
  - **Invoices** — `/invoices` — invoice & riwayat pembayaran. Backend: `/invoices`, `/invoices/:id/payment-history`. Wiki: `invoices.md`
  - **Payment List** — `/payments` — pembayaran & approval. Backend: `/payments`, `/payments/cancel/:id`, `/files/proofPayment`. Wiki: `finance.md`
  - **Student Discounts** — `/student-discounts` — diskon per siswa. Backend: `/discountedProducts`, `/priceModifications`. Wiki: `discounts.md`
  - **Installment Requests** — `/installment-requests` — permintaan cicilan. Backend: `/installmentRequests`. Wiki: `student-billing.md`
  - **Template** — `/document-templates` — template dokumen keuangan. Backend: `/masterDocumentTemplates`. Wiki: `document-templates.md`
  - **Billing Report** — `/billing-report-product` — laporan tagihan per produk. Backend: `/billingReports`, `/billingReports/download/excel`. Wiki: `finance.md`
  - **Student Virtual Account** — `/virtual-accounts` — VA siswa. Backend: `/familyBankInformations`, `/wallets/:parentId/parents`. Wiki: `wallets.md`
  - **Discounts** — `/discounts` — master diskon & setelan. Backend: `/masterDiscounts`, `/masterDiscountSettings`. Wiki: `discounts.md`
  - **Promo** — `/promos` — promo. Backend: `/promos`.
  - **Refund Request** — `/refund-requests` — refund & approval. Backend: `/refundRequests`. Wiki: `finance.md`
  - **Merchant Discount Rate** — `/merchant-discount-rate` — tarif diskon merchant. Backend: `/masterMerchantDiscountRates`.
  - **Wallets** — `/wallets` — wallet & riwayat transaksi. Backend: `/wallets`, `/walletTransactionHistories`. Wiki: `wallets.md`
  - **Security Deposits** — `/security-deposits` — deposit jaminan & refund. Backend: `/securityDeposits/:studentId`, `/securityDeposits/refund`. Wiki: `finance.md`
  - **Media Storage** — `/media-storage` — penyimpanan media. Backend: `/mediaStorage`. Wiki: `media-storage.md` (!) di nav ada di luar dropdown Finance; lihat #3.

---

### Portal: Teacher (`bbs/client-teacher`)

Aplikasi guru: mengajar, menilai, kelas wali, CCA, observasi.

---

#### T1. Dashboard
- **route**: `/landing`
- **deskripsi**: Halaman muka guru: ringkasan kelas, tugas, dan pengumuman.
- **backend**: agregasi dari `classrooms`, `assignments`, `calendar`.

#### T2. Resources
- **route**: `/resources`
- **deskripsi**: Pustaka materi ajar per mata pelajaran, chapter, lesson, assignment.
- **backend**: module `subject-libraries`, `lessons`, `topics`. Endpoint `/subjectLibraries`, `/lessons`, `/topics`.
- **wiki**: `academic-structure.md`

#### T3. Assignments
- **route**: `/assignments`
- **deskripsi**: Tugas yang diberikan ke siswa dan penilaian submission.
- **backend**: module `assign-assignment`. Endpoint `/assignments`.

#### T4. Classrooms
- **route**: `/classrooms`
- **deskripsi**: Daftar kelas yang diampu, detail per kelas, term, laporan, profil siswa.
- **backend**: module `class-year`, `classroom`, `students`. Endpoint `/classYears`, `/classYears/:classYearId/student/:studentId`. Wiki: `class-in-year.md`

#### T5. Form Class
- **route**: `/remark`
- **deskripsi**: Kelas wali: remark perilaku, tinggi/berat badan, streaming & promosi, conduct.
- **backend**: module `remark`, `health`, `student-attendance-reports`, `promote`, `ftp` (conduct).
- **wiki**: `students.md`, `promote.md`, `secondary-discipline.md`
- **anak**:
  - **Remark** — `/remark` — catatan perilaku siswa. Wiki: `students.md`
  - **Height & Weight** — `/height-and-weight` — tinggi/berat badan.
  - **Streaming & Promotion** — `/streaming-and-promotion` — streaming kelas & promosi. Wiki: `promote.md`
  - **Conduct** — `/conduct` — input conduct. Wiki: `secondary-discipline.md`

#### T6. LEAPS
- **route**: `/leaps`
- **deskripsi**: Pencatatan kegiatan LEAPS siswa.
- **backend**: module `leaps-event`, `student-leaps-remark`. Endpoint `/leapsEvents`. Wiki: `leaps.md`

#### T7. Leave Form / Leave Requests
- **route**: `/leave-form`, `/leave-requests`
- **deskripsi**: Pengajuan cuti guru dan daftar permintaan cuti.
- **backend**: module `leaves`. Endpoint `/leaves`.
- **anak**:
  - **Leave Form** — `/leave-form` — form pengajuan.
  - **Leave Requests** — `/leave-requests` — daftar pengajuan.

#### T8. Grade
- **route**: `/ebadges`
- **deskripsi**: Input & lihat nilai: e-badges, gradebook, gradebook sekunder, DCA, gradebook Cambridge (IGCSE/A/AS), hasil placement test.
- **backend**: module `ftp`, `gradebook`, `secondary-gradebook`, `student-cambridge-grade`, `placement-test-results`.
- **wiki**: `gradebooks.md`, `secondary-gradebook.md`, `cambridge.md`, `placement-tests.md`
- **anak**:
  - **E-Badges** — `/ebadges` — input e-badges. Wiki: `cca.md`
  - **Gradebook** — `/gradebook` — gradebook utama per subject year.
  - **Secondary Gradebook** — `/secondary-gradebook` — gradebook sekunder. Wiki: `secondary-gradebook.md`
  - **DCA** — `/dca` — penilaian DCA.
  - **IGCSE / A Level / AS Level Gradebook** — `/cambridge-gradebook/{igcse,a-level,as-level}` — gradebook Cambridge. Wiki: `cambridge.md`
  - **Placement Test Result** — `/placement-test-results` — input hasil placement test. Wiki: `placement-tests.md`

#### T9. Calendar
- **route**: `/calendar`
- **deskripsi**: Kalender akademik guru.
- **backend**: module `schedule`. Endpoint `/schedules`.

#### T10. File Sharing
- **route**: `/file-sharing/academic-department-files`
- **deskripsi**: Berbagi berkas departemen & mapel (sama dengan admin, versi guru).
- **backend**: module `academic-department-file`, `subject-file`. Wiki: `file-sharing.md`
- **anak**:
  - **Academic Department Files** — `/file-sharing/academic-department-files`
  - **Subject Files** — `/file-sharing/subject-files`

#### T11. Scheme of Works
- **route**: `/sows`
- **deskripsi**: Lihat SOW yang berlaku untuk mapel guru.
- **backend**: module `sow`. Endpoint `/sow`. Wiki: `sow.md`

#### T12. Lesson Plan
- **route**: `/lesson-plan`
- **deskripsi**: Editor lesson plan guru, pustaka, file library, yang belum submit, dan viewer.
- **backend**: module `lesson-plan`. Endpoint `/lesson-plans`.
- **anak**:
  - **Lesson Plan** — `/lesson-plan`
  - **Library** — `/lesson-plan/library`
  - **File Library** — `/lesson-plan/file-library`
  - **No Submission** — `/lesson-plan/no-submission`
  - **Lesson Plan Viewer** — `/lesson-plan-viewer`

#### T13. PETALS
- **route**: `/petals-summary`
- **deskripsi**: Observasi & e-PETALS dari sisi guru.
- **backend**: module `petals`.
- **anak**:
  - **Summary Report** — `/petals-summary`
  - **Observation** — `/petals-observation`
  - **E-PETALS** — `/epetals-dashboard`

#### T14. Appraisal
- **route**: `/appraisal-new`
- **deskripsi**: Penilaian kinerja staf dari sisi guru (staff database, summary, lock).
- **backend**: module `appraisal`.
- **anak**:
  - **Staff Database** — `/appraisal-new`
  - **Summary Report** — `/appraisal-summary`
  - **Lock/Unlock** — `/appraisal-lock`
  - **Lock Audit** — `/appraisal-lock/audit`

#### T15. Co-Curricular Activities
- **route**: `/ccaYear`
- **deskripsi**: CCA dari sisi guru: penilaian CCA, penugasan, approval registrasi.
- **backend**: module `cca-year`, `cca-registration`, `cca-grade-setting`.
- **wiki**: `cca.md`
- **anak**:
  - **CCA Grading** — `/ccaYear` — input nilai CCA.
  - **CCA Assignment** — `/ccaYearAssignment` — penugasan siswa.
  - **CCA Approvals** — `/ccaRegistrationApprovals` — approval registrasi.

#### T16. Release Student
- **route**: `/release-student`
- **deskripsi**: Melepas siswa (penjemputan).
- **backend**: module `student-pick-up-requests`. Wiki: `pickup.md`

#### T17. Attendance Monitoring
- **route**: `/attendance-monitoring`
- **deskripsi**: Pemantauan kehadiran harian dan disiplin.
- **backend**: module `attendances`, `daily-attendances`, `disciplines`.
- **wiki**: `attendance.md`, `discipline.md`
- **anak**:
  - **Daily Attendance** — `/attendance-monitoring` — absensi harian.
  - **Discipline** — `/attendance-monitoring/discipline` — disiplin. Wiki: `discipline.md`

#### T18. SVE
- **route**: `/sves`
- **deskripsi**: SVE sisi guru: assignment, input nilai ujian, analitik butir soal, past paper.
- **backend**: module `sve`, `sve-item-analysis`.
- **wiki**: `sve.md`, `sve-grade-input.md`, `sve-item-analysis.md`
- **anak**:
  - **Assignment** — `/sves` — daftar ujian.
  - **Input Exam Grade** — `/grade-input/:sveExamTypeId` — input nilai. Wiki: `sve-grade-input.md`
  - **Item Analysis Analytics** — `/item-analysis-analytics/:sveExamTypeId` — analitik butir. Wiki: `sve-item-analysis.md`
  - **Past Paper** — `/sves-past-paper/:sveExamTypeId` — naskah lama. Wiki: `sve-files.md`

#### T19. BMT File Download
- **route**: `/bmt-files/:sveExamTypeId`
- **deskripsi**: Unduh berkas BMT per ujian.
- **backend**: module `bmt-weeks`.

#### T20. Exam Supporting File Download
- **route**: `/exam-supporting-files/:sveExamTypeId`
- **deskripsi**: Unduh berkas pendukung ujian.
- **backend**: module `sve-files`.

---

### Portal: Student (`bbs/client-student`)

Aplikasi siswa: belajar, tugas, CCA, rapor, penjemputan.

---

#### S1. Dashboard
- **route**: `/dashboard`
- **deskripsi**: Ringkasan siswa: tugas, kelas, agenda.
- **backend**: agregasi `assignments`, `classrooms`, `calendar`.

#### S2. My Subjects
- **route**: `/subjects`
- **deskripsi**: Mata pelajaran siswa, drill-down topik dan lesson.
- **backend**: module `subject-year`, `topics`, `lessons`. Endpoint `/subjectYears`, `/topics`, `/lessons`. Wiki: `academic-structure.md`

#### S3. Assignments
- **route**: `/assignments`
- **deskripsi**: Daftar tugas siswa dan halaman pengumpulan.
- **backend**: module `assign-assignment`, `student-assignment`. Endpoint `/assignments`, `/assignments/:studentAssignmentId`.

#### S4. Calendar
- **route**: `/calendar`
- **deskripsi**: Kalender akademik siswa.
- **backend**: module `schedule`. Endpoint `/schedules`.

#### S5. Classroom
- **route**: `/classroom`
- **deskripsi**: Kelas siswa, materi, dan aktivitas.
- **backend**: module `class-year`, `classroom`.
- **wiki**: `class-in-year.md`

#### S6. CCA
- **route**: `/ccaYear`
- **deskripsi**: CCA yang diikuti siswa.
- **backend**: module `cca-year`.
- **wiki**: `cca.md`

#### S7. CCA Registration
- **route**: `/cca-registration`
- **deskripsi**: Siswa mendaftar CCA.
- **backend**: module `cca-registration`. Endpoint `/ccaRegistrations`.
- **wiki**: `cca.md`

#### S8. Report
- **route**: `/report`
- **deskripsi**: Rapor/hasil belajar siswa.
- **backend**: module `student-report`, `reports`.
- **wiki**: `reports.md`

#### S9. Subject Library
- **route**: `/subjectLibrary`
- **deskripsi**: Pustaka materi pelajaran untuk siswa.
- **backend**: module `subject-libraries`, `lessons`.
- **wiki**: `academic-structure.md`

#### S10. My Certificate
- **route**: `/my-certificate`
- **deskripsi**: Sertifikat yang dimiliki siswa.
- **backend**: module `student-certificates`.
- **wiki**: `certificates.md`

#### S11. Pickup Persons
- **route**: `/pickup`
- **deskripsi**: Daftar orang yang diizinkan menjemput siswa.
- **backend**: module `student-pick-up-persons`. Endpoint `/studentPickUpPersons`.
- **wiki**: `pickup.md`

---

## Pertanyaan Terbuka untuk Review

1. **Admission ditaruh di mana?** Di nav admin, "Admission" berada di antara Employee, Programme & Level, dan Finance dalam satu array (`finaMenu`), bukan di master data akademik. Draft ini menaruhnya sebagai cabang sejajar di Admin. Apakah admission tetap mandiri, atau digabung ke kategori keuangan/akademik?

2. **"Grades" di Academic Year Data berisi campuran.** Satu dropdown memuat setelan CCA, e-badges, gradebook, GPA sekunder, LO, dan SPR. Draft mempertahankan struktur menu apa adanya. Alternatif: pecah menjadi "Gradebook Settings", "Secondary GPA", dan "Assessment Settings". Pilih mana?

3. **Media Storage** ada di ujung `finaMenu` di luar dropdown Finance, tapi isinya bukan fitur keuangan. Draft menaruhnya di bawah Finance agar sesuai menu; apakah lebih baik dipindah ke catatan terpisah?

4. **Portal Student & Teacher belum punya kategori.** Draft membiarkan node portal guru/siswa datar (sesuai menu asli). Apakah perlu dikelompokkan konseptual (Learn, Assess, Conduct, Library)?

5. **Node meta** (`client-common`, `legacy-api`, `open-questions`, `sources`): dipertahankan sebagai node non-fitur bertipe `meta`, atau dibuang dari peta menu?

6. **Kedalaman**: draft berhenti di level menu sidebar (dropdown terakhir). Beberapa layar punya tab internal (mis. Detail Siswa → tab Grades/Attendance/Billing). Perlu node level-3 untuk tab penting, atau cukup disebut di deskripsi?

7. **Route base path**: basename router tiap app (`/admin`, `/teacher`, `/student`) belum dipastikan. Perlu saya cek `routes.js` masing-masing dan lengkapi path absolutnya?

8. **Bahasa label**: sebagian label berbahasa Indonesia ("Transkrip Nilai"), sebagian Inggris. Ikuti label asli apa adanya, atau dinormalisasi?

---

## Ringkasan Cakupan

| Portal | Item menu (nav entries) | Node level-1 di draft |
|---|---|---|
| Admin | 171 entri (termasuk induk dropdown) | 21 cabang, ±130 node leaf |
| Teacher | 56 entri | 20 cabang |
| Student | 11 entri | 11 node |

Seluruh 228 module backend tetap terwakili sebagai referensi di deskripsi node, tetapi tidak lagi menjadi node utama.
