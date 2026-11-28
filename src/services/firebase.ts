import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

// The AI journal also needs the app ID
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

// null until .env.local is filled in, so a missing key cannot crash the app
export const app = isFirebaseConfigured
  ? initializeApp({ ...firebaseConfig, appId })
  : null;

// Optional: App Check stops other websites and scripts from using your AI quota
const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
if (app && recaptchaKey) {
  initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(recaptchaKey),
    isTokenAutoRefreshEnabled: true,
  });
}

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const aiApp = appId ? app : null;
