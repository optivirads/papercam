# Building the Android APK File (.apk)

The Papercam project includes a native Android wrapper (`/android`) generated via **Capacitor**.

## Prerequisites for Local APK Compilation
To compile the `.apk` file locally on your computer:
1. **Java Development Kit (JDK 17 or JDK 21)** installed on your OS.
2. **Android Studio** (or Android SDK Command-line Tools).

---

## Option 1: Build APK via Android Studio (Recommended)

1. Build web production assets:
   ```bash
   npm run build
   npx cap sync
   ```

2. Open the native Android project in Android Studio:
   ```bash
   npx cap open android
   ```

3. In Android Studio:
   - Wait for Gradle sync to complete.
   - Click **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.

4. Your `.apk` file will be generated at:
   `android/app/build/outputs/apk/debug/app-debug.apk`

---

## Option 2: Build APK via Command Line (Terminal)

Set your `JAVA_HOME` environment variable to point to JDK 17+, then run:

```powershell
npm run build
npx cap sync
cd android
.\gradlew assembleDebug
```

Output file:
`android\app\build\outputs\apk\debug\app-debug.apk`

---

## Option 3: Automated GitHub Actions Build (Cloud)

A continuous integration workflow `.github/workflows/android.yml` is included in this repository.
When pushed to GitHub:
- It automatically installs Node, JDK 17, and Android SDK.
- Runs `npx cap sync` and `./gradlew assembleDebug`.
- Generates and attaches `papercam-psc-master-debug.apk` as a downloadable artifact.
