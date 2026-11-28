import { useState } from "react";
import { authModes, type AuthMode } from "./authModes";
import { AuthError, type GoogleAuth, type PasswordAuth } from "./types";

// State and actions of the login form, with no markup
export function useAuthForm(auth: PasswordAuth & GoogleAuth) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function run(action: () => Promise<string | void>) {
    setError("");
    setNotice("");
    setBusy(true);

    try {
      setNotice((await action()) ?? "");
    } catch (caught) {
      setError(caught instanceof AuthError ? caught.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return {
    config: authModes[mode],
    mode,
    email,
    password,
    error,
    notice,
    busy,
    setEmail,
    setPassword,
    changeMode(next: AuthMode) {
      setMode(next);
      setPassword("");
      setError("");
      setNotice("");
    },
    submit: () => run(() => authModes[mode].submit(auth, { email, password })),
    signInWithGoogle: () => run(() => auth.signInWithGoogle()),
  };
}
