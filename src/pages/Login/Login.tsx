import { useState, type SyntheticEvent } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAppSelector } from "../../app/hooks";
import { authErrorMessage } from "../../features/auth/authErrors";
import { auth } from "../../services/firebase";

type Mode = "login" | "signup" | "reset";

const titles: Record<Mode, string> = {
  login: "Log in",
  signup: "Create account",
  reset: "Reset password",
};

const inputClass = "mt-1 w-full rounded border border-gray-300 px-3 py-2";
const linkClass = "text-indigo-600 hover:underline";

export default function Login() {
  const { user, ready } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  if (!ready) {
    return <div className="p-6">Loading…</div>;
  }

  // Runs after a successful login too: go back to the page that was asked for
  if (user) {
    return <Navigate to={from ?? "/"} replace />;
  }

  if (!auth) {
    return (
      <div className="p-6">
        Login is not set up yet. Add your Firebase values to <code>.env.local</code>{" "}
        (see the README) and restart the app.
      </div>
    );
  }

  const firebaseAuth = auth;

  function changeMode(next: Mode) {
    setMode(next);
    setPassword("");
    setError("");
    setNotice("");
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setBusy(true);

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(firebaseAuth, email, password);
      } else if (mode === "signup") {
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
      } else {
        await sendPasswordResetEmail(firebaseAuth, email);
        setNotice("If an account exists for this email, a reset link has been sent.");
      }
    } catch (caught) {
      setError(authErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm p-6">
      <h1 className="mb-4 text-2xl font-semibold">{titles[mode]}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Email
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>

        {mode !== "reset" && (
          <label className="block">
            Password
            <input
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              required
              minLength={mode === "signup" ? 6 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </label>
        )}

        {error && (
          <p role="alert" className="text-red-600">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="text-green-700">
            {notice}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded bg-indigo-600 px-3 py-2 text-white disabled:opacity-50"
        >
          {busy ? "Please wait…" : titles[mode]}
        </button>
      </form>

      <div className="mt-4 flex flex-col items-start gap-2">
        {mode !== "login" && (
          <button type="button" className={linkClass} onClick={() => changeMode("login")}>
            Back to log in
          </button>
        )}
        {mode === "login" && (
          <>
            <button type="button" className={linkClass} onClick={() => changeMode("signup")}>
              Create an account
            </button>
            <button type="button" className={linkClass} onClick={() => changeMode("reset")}>
              Forgot password?
            </button>
          </>
        )}
      </div>
    </div>
  );
}
