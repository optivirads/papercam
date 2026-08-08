# Production Authentication & Google / SMS OTP Integration Guide

This guide details how to configure **Google OAuth 2.0** and **Mobile Phone SMS OTP** authentication via **Firebase Authentication** or **Google Cloud** for PSC Master.

---

## 1. Firebase Authentication Setup

### A. Create Firebase Project
1. Go to [console.firebase.google.com](https://console.firebase.google.com) and click **Add Project**.
2. Name your project: `PSC Master`
3. Click **Continue** and complete project creation.

### B. Enable Google & Phone Authentication
1. In the Firebase Console left menu, navigate to **Build** > **Authentication**.
2. Click **Get Started**.
3. Under **Sign-in method**:
   - **Google**: Enable Google sign-in. Set Support Email to your developer email and click **Save**.
   - **Phone**: Enable Phone authentication and click **Save**.

---

## 2. Register Android App & Add SHA-1 Fingerprint

To enable Google OAuth and SMS OTP on Android devices, Firebase requires your app's **SHA-1 certificate fingerprint**.

### A. Add Android App in Firebase
1. Click the **Android icon** on your Firebase project overview page.
2. Enter Android Package Name: `com.papercam.pscmaster`
3. Enter App Nickname: `PSC Master`

### B. Extract SHA-1 Fingerprint from `release-key.jks`
Run the following keytool command in terminal:

```cmd
C:\Users\abhin\.jdk-21\jdk-21.0.2+13\bin\keytool.exe -list -v -keystore c:\Users\abhin\Desktop\Papercam\android\app\release-key.jks -alias pscmasterkey -storepass pscmaster123
```

Copy the generated **SHA1** and **SHA256** fingerprints into the **Debug/Release signing certificate SHA-1** field in Firebase Console.

### C. Download `google-services.json`
1. Download `google-services.json` from Firebase Console.
2. Place `google-services.json` directly into:  
   `C:\Users\abhin\Desktop\Papercam\android\app\google-services.json`

---

## 3. Role-Based Access Control (RBAC) Whitelist

To authorize administrators to access the Admin CMS (`admin_qbank`, `admin_courses`, `admin_analytics`, `admin_students`), add their Google emails or mobile numbers to the `ADMIN_EMAILS` or `ADMIN_PHONES` list in:  
[authService.ts](file:///c:/Users/abhin/Desktop/Papercam/src/services/authService.ts)

```ts
const ADMIN_EMAILS = [
  'admin@papercam.app',
  'abhinav@papercam.app',
  'pscmaster.admin@gmail.com'
];

const ADMIN_PHONES = [
  '9876543210',
  '9995550000'
];
```

Users authenticating with any of these credentials will automatically receive the **`'admin'`** role and unlock the **Admin CMS Panel**, while all other users are restricted to the **Student View**.
