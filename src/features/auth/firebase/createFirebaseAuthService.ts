import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type Auth,
} from "firebase/auth";
import type { AuthService } from "../types";
import { isCancellation, toAuthError } from "./firebaseAuthErrors";

// Runs a Firebase call and turns its errors into the app's AuthError
async function run(call: () => Promise<unknown>) {
  try {
    await call();
  } catch (error) {
    throw toAuthError(error);
  }
}

export function createFirebaseAuthService(auth: Auth): AuthService {
  return {
    observeUser: (onChange) =>
      onAuthStateChanged(auth, (user) => {
        onChange(user ? { uid: user.uid, email: user.email } : null);
      }),

    signOut: () => run(() => signOut(auth)),

    signIn: ({ email, password }) =>
      run(() => signInWithEmailAndPassword(auth, email, password)),

    signUp: ({ email, password }) =>
      run(() => createUserWithEmailAndPassword(auth, email, password)),

    resetPassword: (email) => run(() => sendPasswordResetEmail(auth, email)),

    signInWithGoogle: () =>
      run(async () => {
        const provider = new GoogleAuthProvider();
        // Let people choose an account instead of reusing the last one
        provider.setCustomParameters({ prompt: "select_account" });
        try {
          // Must run straight from the click, or the browser may block the popup
          await signInWithPopup(auth, provider);
        } catch (error) {
          if (!isCancellation(error)) throw error;
        }
      }),
  };
}
