Place the Campus Notes APK file here.

File name: campus-notes.apk

Instructions:
1. Build the APK in Android Studio (Build → Generate Signed APK or Build APK).
2. Copy the output APK from:
   android/app/build/outputs/apk/debug/app-debug.apk
   (or release: android/app/build/outputs/apk/release/app-release.apk)
3. Rename it to: campus-notes.apk
4. Drop it into this folder (client/public/downloads/).
5. Update APK_VERSION and APK_DATE constants in:
   client/src/components/DownloadApp.jsx
6. Run: npm run build && npx cap sync android
7. Commit & push.

This file (README.txt) is just a placeholder so git tracks this folder.
DO NOT delete this file unless the APK is present.
