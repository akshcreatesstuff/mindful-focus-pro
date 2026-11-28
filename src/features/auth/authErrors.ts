import { FirebaseError } from "firebase/app";

const messages: Record<string, string> = {
  "auth/invalid-credential": "Wrong email or password.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/weak-password": "Use a password with at least 6 characters.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/too-many-requests": "Too many attempts. Wait a while and try again.",
  "auth/network-request-failed": "Network problem. Check your connection.",
  "auth/operation-not-allowed":
    "Email/password sign-in is not enabled in the Firebase console.",
};

export function authErrorMessage(error: unknown) {
  const code = error instanceof FirebaseError ? error.code : "";
  return messages[code] ?? `Something went wrong. ${code}`.trim();
}
