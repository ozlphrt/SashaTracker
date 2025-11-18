# Firebase Setup Guide for Cloud Sync

**⚠️ Cloud sync is REQUIRED for multi-device usage.**

**Important:** Firebase configuration is done **once by the developer/deployer** (not by each end user). Once configured, all users/devices automatically connect to the same Firebase project for synchronization.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `SashaTracker` (or any name)
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In Firebase Console, go to **Build** > **Firestore Database**
2. Click "Create database"
3. Start in **production mode** (we'll set up security rules)
4. Choose a location (closest to you)
5. Click "Enable"

## Step 3: Set Up Security Rules

1. Go to **Firestore Database** > **Rules** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /programs/{document=**} {
      // Allow read/write for authenticated users (anonymous auth is fine)
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

## Step 4: Enable Anonymous Authentication

1. Go to **Build** > **Authentication**
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Enable **Anonymous** authentication
5. Click "Save"

## Step 5: Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the **Web** icon (`</>`)
4. Register app with nickname: `SashaTracker`
5. Copy the `firebaseConfig` object

## Step 6: Add Config to App

1. Open `src/config/firebase.ts`
2. Replace the placeholder values with your Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 7: Test Sync

1. Run `npm run dev`
2. Open the app on two different devices/browsers
3. Log data on one device
4. Refresh the other device - data should appear automatically!

## Troubleshooting

- **Sync not working?** Check browser console for errors
- **Permission denied?** Verify Firestore security rules
- **Auth failed?** Make sure Anonymous authentication is enabled
- **Data not syncing?** Check network tab for Firestore requests

---

**Note:** The app requires Firebase configuration to function. If Firebase is not configured, the app will display a setup page with instructions. Once configured, data syncs in real-time across all devices.

