import type { Credentials, PasswordAuth } from "./types";

export type AuthMode = "login" | "signup" | "reset";

type ModeConfig = {
  title: string;
  /** Leave out to hide the password field. */
  password?: { autoComplete: string; minLength?: number };
  showGoogle: boolean;
  links: { mode: AuthMode; label: string }[];
  /** May return a message to show after success. */
  submit: (auth: PasswordAuth, credentials: Credentials) => Promise<string | void>;
};

const backToLogin = { mode: "login", label: "Back to log in" } as const;

// To add or change a form mode, edit this list. The form itself stays the same.
export const authModes: Record<AuthMode, ModeConfig> = {
  login: {
    title: "Log in",
    password: { autoComplete: "current-password" },
    showGoogle: true,
    links: [
      { mode: "signup", label: "Create an account" },
      { mode: "reset", label: "Forgot password?" },
    ],
    submit: (auth, credentials) => auth.signIn(credentials),
  },
  signup: {
    title: "Create account",
    password: { autoComplete: "new-password", minLength: 6 },
    showGoogle: true,
    links: [backToLogin],
    submit: (auth, credentials) => auth.signUp(credentials),
  },
  reset: {
    title: "Reset password",
    showGoogle: false,
    links: [backToLogin],
    submit: async (auth, { email }) => {
      await auth.resetPassword(email);
      return "If an account exists for this email, a reset link has been sent.";
    },
  },
};
