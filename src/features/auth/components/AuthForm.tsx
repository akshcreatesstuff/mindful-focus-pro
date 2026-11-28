import type { SyntheticEvent } from "react";
import type { GoogleAuth, PasswordAuth } from "../types";
import { useAuthForm } from "../useAuthForm";

// Markup of the login form; behaviour lives in useAuthForm
export default function AuthForm({ auth }: { auth: PasswordAuth & GoogleAuth }) {
  const form = useAuthForm(auth);
  const { title, password, showGoogle, links } = form.config;

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    form.submit();
  }

  return (
    <div className="card auth-card">
      <h1>{title}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Email
          <input
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => form.setEmail(e.target.value)}
            className="input"
          />
        </label>

        {password && (
          <label className="block">
            Password
            <input
              type="password"
              autoComplete={password.autoComplete}
              required
              minLength={password.minLength}
              value={form.password}
              onChange={(e) => form.setPassword(e.target.value)}
              className="input"
            />
          </label>
        )}

        {form.error && (
          <p role="alert" className="text-danger">
            {form.error}
          </p>
        )}
        {form.notice && (
          <p role="status" className="text-success">
            {form.notice}
          </p>
        )}

        <button type="submit" disabled={form.busy} className="btn primary w-full">
          {form.busy ? "Please wait…" : title}
        </button>
      </form>

      {showGoogle && (
        <button
          type="button"
          disabled={form.busy}
          onClick={form.signInWithGoogle}
          className="btn mt-3 w-full"
        >
          Continue with Google
        </button>
      )}

      <div className="mt-4 flex flex-col items-start gap-2">
        {links.map((link) => (
          <button
            key={link.mode}
            type="button"
            className="link"
            onClick={() => form.changeMode(link.mode)}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
