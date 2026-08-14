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
  apiKey: import.meta.env.AIzaSyDPNyfK-ptPHftrwEQz3TOEkwfj8vGp3ZM,
  authDomain: import.meta.env.serofero-6651b.firebaseapp.com,
  projectId: import.meta.env.serofero-6651b,
  storageBucket: import.meta.env.serofero-6651b.firebasestorage.app,
  messagingSenderId: import.meta.env.1014822279122,
  appId: import.meta.env.1:1014822279122:web:90f885570e25680cecda0b,
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
