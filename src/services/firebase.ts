import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

// null until .env.local is filled in, so a missing key cannot crash the app
export const auth = isFirebaseConfigured
  ? getAuth(initializeApp(firebaseConfig))
  : null;
