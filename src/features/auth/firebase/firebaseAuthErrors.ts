import { FirebaseError } from "firebase/app";
import { AuthError } from "../types";

const messages: Record<string, string> = {
  "auth/invalid-credential": "Wrong email or password.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/weak-password": "Use a password with at least 6 characters.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/too-many-requests": "Too many attempts. Wait a while and try again.",
  "auth/network-request-failed": "Network problem. Check your connection.",
  "auth/operation-not-allowed":
    "This sign-in method is not enabled in the Firebase console.",
  "auth/popup-blocked":
    "Your browser blocked the sign-in window. Allow popups and try again.",
  "auth/unauthorized-domain":
    "This web address is not in Firebase's authorized domains list.",
  "auth/account-exists-with-different-credential":
    "This email already uses another sign-in method. Log in that way instead.",
};

// The person closed the Google window themselves, so there is nothing to report
const cancellations = ["auth/popup-closed-by-user", "auth/cancelled-popup-request"];

export function isCancellation(error: unknown) {
  return error instanceof FirebaseError && cancellations.includes(error.code);
}

export function toAuthError(error: unknown) {
  const code = error instanceof FirebaseError ? error.code : "";
  return new AuthError(messages[code] ?? `Something went wrong. ${code}`.trim());
}
