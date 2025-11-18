# Firebase Setup Progress

## ✅ Step 1: Create Firebase Project
- [x] Project created

## Step 2: Enable Firestore Database
- [ ] Go to **Build** > **Firestore Database** in Firebase Console
- [ ] Click "Create database"
- [ ] Select **Production mode** (we'll set rules next)
- [ ] Choose a location (closest to you - e.g., `us-central`, `europe-west`, etc.)
- [ ] Click "Enable"

## Step 3: Set Security Rules
- [ ] Go to **Firestore Database** > **Rules** tab
- [ ] Replace the default rules with the provided rules
- [ ] Click "Publish"

## Step 4: Enable Anonymous Authentication
- [ ] Go to **Build** > **Authentication**
- [ ] Click "Get started" (if first time)
- [ ] Go to **Sign-in method** tab
- [ ] Click on **Anonymous**
- [ ] Toggle **Enable**
- [ ] Click "Save"

## Step 5: Get Firebase Config
- [ ] Go to **Project Settings** (gear icon, top left)
- [ ] Scroll down to "Your apps" section
- [ ] Click the **Web** icon (`</>`)
- [ ] Register app with nickname: `SashaTracker`
- [ ] Copy the `firebaseConfig` object values

## Step 6: Add Config to App
- [ ] Update `src/config/firebase.ts` with your config values
- [ ] Test the app

