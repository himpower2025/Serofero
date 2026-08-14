// Firebase client SDK setup.
//
// UNLIKE the Gemini API key, this config object is SAFE to ship in the client
// bundle — it's how every Firebase web/mobile app works. Real security comes
// from Firestore Security Rules (see /FIREBASE_SETUP.md), not from hiding
// these values.
//
// HOW TO FILL THIS IN:
// 1. Go to https://console.firebase.google.com → Create a project (or use an
//    existing one).
// 2. Project settings (gear icon) → General → "Your apps" → Add app → Web (</>).
// 3. Register the app (nickname can be "Serofero Web") — Firebase shows you
//    an object exactly like `firebaseConfig` below. Copy those real values in.
// 4. Authentication → Sign-in method → enable "Google".
// 5. Firestore Database → Create database → start in production mode, then
//    apply the rules in /FIREBASE_SETUP.md.
//
// Full step-by-step guide (including the Android/iOS native app registration
// needed for Capacitor builds): see /FIREBASE_SETUP.md in the project root.

import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'REPLACE_WITH_FIREBASE_API_KEY',
  authDomain: 'REPLACE_WITH_PROJECT_ID.firebaseapp.com',
  projectId: 'REPLACE_WITH_PROJECT_ID',
  storageBucket: 'REPLACE_WITH_PROJECT_ID.appspot.com',
  messagingSenderId: 'REPLACE_WITH_SENDER_ID',
  appId: 'REPLACE_WITH_APP_ID',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

// True once the placeholders above have been replaced with a real project.
// Used to fail gracefully (fall back to local sample data) instead of
// throwing when someone runs the app before configuring Firebase.
export const isFirebaseConfigured =
  firebaseConfig.apiKey !== 'REPLACE_WITH_FIREBASE_API_KEY';
