# PSC Master — End-to-End App Workflow & Technical Architecture Guide

**PSC Master** is an authentic, production-grade learning and competitive exam assessment platform tailored for Kerala PSC (LDC, VFA, Sub Inspector of Police, KAS, LP/UP Assistant, University Assistant) aspirants.

---

## 1. User Authentication & Role Security (RBAC)

- **Authentication Methods**: Supports **Google OAuth 2.0** and **Mobile Phone SMS OTP** sign-in.
- **Role Assignment**:
  - **Student Role (`'student'`)**: Standard access to Dashboard, Courses, Syllabus, Mock Tests, Downloads, and Profile.
  - **Admin Role (`'admin'`)**: Authorized administrators (matching `ADMIN_EMAILS` or `ADMIN_PHONES` in [authService.ts](file:///c:/Users/abhin/Desktop/Papercam/src/services/authService.ts)) unlock the **Admin CMS Panel**.
- **Admin Route Guards**: In [App.tsx](file:///c:/Users/abhin/Desktop/Papercam/src/App.tsx), any attempt by a non-admin account to navigate to `'admin_*'` routes is automatically blocked, prompting an alert and redirecting to the Student Dashboard.

---

## 2. Timed Mock Exam Engine & Kerala PSC Scoring Formula

- **Dynamic Test Launcher**: Students choose 10, 20, 30, or 50 question mock tests.
- **Dual-Language Switcher**: Instant toggle between **English (🇬🇧)** and **Malayalam (🇮🇳)** for all questions and options.
- **Kerala PSC Scoring Formula**:
  $$\text{Final PSC Score} = (\text{Correct Answers} \times 1.0) - (\text{Wrong Answers} \times 0.33)$$
- **Session Result Persistence**: Every submitted exam is automatically recorded into the local `exam_results` IndexedDB database store, computing accuracy percentages, time spent, and historical rank.

---

## 3. Official Kerala PSC Syllabus Module

- Accessible directly via the **Syllabus** tab on the bottom navigation bar and side drawer ([SyllabusScreen.tsx](file:///c:/Users/abhin/Desktop/Papercam/src/components/student/SyllabusScreen.tsx)).
- Official mark distribution and sub-unit breakdowns for:
  - **LDC 2024 (10th SSLC Level)**: GK (50m), Science (20m), Math & Mental Ability (20m), English (10m), Malayalam (10m).
  - **Village Field Assistant (VFA)**: Revenue Laws, Land Reforms, Agriculture Science.
  - **Sub Inspector of Police (SI / Degree Level)**: Law & Polity, Analytical Reasoning, Advanced English.
  - **Kerala Administrative Service (KAS)**: Gazetted Officer Paper I & II.
- Includes official PDF syllabus downloads and direct *"Practice Questions on Topic"* action buttons.

---

## 4. AI Web Topic Question Generator Engine

- Accessible in the Admin Question Bank ([AdminQuestionBankScreen.tsx](file:///c:/Users/abhin/Desktop/Papercam/src/components/admin/AdminQuestionBankScreen.tsx)) via [aiQuestionGenerator.ts](file:///c:/Users/abhin/Desktop/Papercam/src/services/aiQuestionGenerator.ts).
- Admins can type any topic or keyword (*e.g., "Kerala Rivers & Waterfalls", "Articles 14-32", "Samasam", "Time & Work"*).
- The engine automatically formats dual-language questions, 4 option choices, correct keys, and explanations, saving them directly to IndexedDB.

---

## 5. Local Offline Database (IndexedDB)

- Built in [db.ts](file:///c:/Users/abhin/Desktop/Papercam/src/services/db.ts).
- Operates 100% offline without requiring continuous cloud connection, persisting:
  - `questions`: Real verified question bank.
  - `student_profile`: Candidate profile details & target exams.
  - `exam_results`: Saved mock test history & scorecards.
  - `student_records`: Enrolled candidates database.

---

## 6. Google Play Store Submission Artifacts

- **Android App Bundle (.aab)**: [papercam-psc-master-release.aab](file:///c:/Users/abhin/Desktop/Papercam/papercam-psc-master-release.aab) *(Ready for Play Console upload)*.
- **Signed Release APK (.apk)**: [papercam-psc-master-release.apk](file:///c:/Users/abhin/Desktop/Papercam/papercam-psc-master-release.apk).
- **Release Signing Keystore**: `android/app/release-key.jks` *(RSA 2048-bit)*.
- **Submission Checklist**: Complete step-by-step upload guide in [PLAYSTORE_CHECKLIST.md](file:///c:/Users/abhin/Desktop/Papercam/PLAYSTORE_CHECKLIST.md).
