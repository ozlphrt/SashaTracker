import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

// Firebase configuration
// TODO: Replace with your Firebase project config
// Get this from Firebase Console > Project Settings > General > Your apps
// See FIREBASE_SETUP.md for detailed instructions
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC6YPQIJDJEoAAtHlw7NRokstP1MqjelEI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sashatracker-b5fd8.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sashatracker-b5fd8",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sashatracker-b5fd8.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "237386847768",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:237386847768:web:c22bdbd075fda6989c956d"
};

// Check if Firebase is configured
const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY" && 
                              firebaseConfig.projectId !== "YOUR_PROJECT_ID";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw new Error('Firebase initialization failed. Please check your configuration.');
  }
} else {
  // Firebase is required - don't initialize but export null so we can show setup page
  console.error('Firebase not configured. Cloud sync is required. See FIREBASE_SETUP.md for setup instructions.');
}

export { db, auth, isFirebaseConfigured };
export default app;
