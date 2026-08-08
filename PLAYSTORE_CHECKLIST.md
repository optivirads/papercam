# Google Play Store Upload & Submission Checklist

PSC Master is **100% prepared and signed** for submission to the Google Play Store.

## Signed Production Artifacts

- **Android App Bundle (.aab)** *(Required for Play Store Upload)*:  
  [papercam-psc-master-release.aab](file:///c:/Users/abhin/Desktop/Papercam/papercam-psc-master-release.aab)  
  `C:\Users\abhin\Desktop\Papercam\papercam-psc-master-release.aab`

- **Signed Release APK (.apk)** *(Direct Installation & Sideloading)*:  
  [papercam-psc-master-release.apk](file:///c:/Users/abhin/Desktop/Papercam/papercam-psc-master-release.apk)  
  `C:\Users\abhin\Desktop\Papercam\papercam-psc-master-release.apk`

- **Release Keystore Location**:  
  `C:\Users\abhin\Desktop\Papercam\android\app\release-key.jks`  
  *Password*: `pscmaster123` | *Alias*: `pscmasterkey`

---

## Step-by-Step Google Play Console Submission Guide

### Step 1: Open Google Play Console
1. Go to [play.google.com/console](https://play.google.com/console) and log in with your Google Play Developer Account.
2. Click **Create app** at top right.
3. Fill in basic details:
   - **App Name**: `PSC Master — Kerala PSC Prep`
   - **Default Language**: `English (United States)` or `Malayalam`
   - **App or Game**: `App`
   - **Free or Paid**: `Free`
   - Check Developer Declarations and click **Create app**.

---

### Step 2: Upload the Android App Bundle (.aab)
1. In the left navigation menu, go to **Testing** > **Internal testing** or **Production**.
2. Click **Create new release**.
3. Under **App bundles**, drag and drop your generated file:  
   `c:\Users\abhin\Desktop\Papercam\papercam-psc-master-release.aab`
4. Enter Release Name: `1.0.0 (Initial Release)`
5. Enter Release Notes:
   ```text
   • Kerala PSC LDC, VFA, KAS & SI Mock Tests
   • Full offline question bank & instant score analysis
   • English & Malayalam dual language question medium
   ```
6. Click **Save** then **Review release**.

---

### Step 3: Set Up Store Listing & Compliance
1. **Main Store Listing**:
   - **Short Description**: `Kerala PSC exam prep with mock tests, PYQ papers, and AI question bank.`
   - **Full Description**: `PSC Master is Kerala's premier preparation app for LDC, VFA, KAS, and Degree Level competitive exams. Features timed mock tests with negative marking, dual-language questions, and detailed answer explanations.`
   - **App Icon**: Upload `icon-512x512.png` (512×512 px PNG).
   - **Feature Graphic**: 1024×500 px banner image.
   - **Phone Screenshots**: Minimum 2 mobile screenshots of the app.

2. **Privacy Policy**:
   - Paste your hosted Privacy Policy URL or use the built-in app Privacy Policy details from [PrivacyPolicyModal.tsx](file:///c:/Users/abhin/Desktop/Papercam/src/components/common/PrivacyPolicyModal.tsx).

3. **App Content Declarations**:
   - **Privacy Policy**: Completed.
   - **Ads**: Select "No, my app does not contain ads".
   - **App Access**: Select "All functionality is available without restriction".
   - **Content Rating**: Complete short IARC rating survey (select Education/Quiz category).
   - **Target Audience**: Select 18 and over (Adult competitive exam takers).
   - **Data Safety**: Declare local device storage usage (No 3rd party sharing).

---

### Step 4: Rollout to Production
1. Go back to **Production** release page.
2. Click **Start rollout to Production**.
3. Google usually reviews new apps within 24 to 72 hours, after which **PSC Master** will be live on the Google Play Store worldwide!
