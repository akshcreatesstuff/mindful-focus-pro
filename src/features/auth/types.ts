// The app's own description of authentication. Nothing here knows about Firebase.

export type AuthUser = {
  uid: string;
  email: string | null;
};

export type Credentials = {
  email: string;
  password: string;
};

/** Who is logged in, and logging out. */
export interface AuthSession {
  /** Calls onChange with the current user, then on every change. Returns a stop function. */
  observeUser(onChange: (user: AuthUser | null) => void): () => void;
  signOut(): Promise<void>;
}

/** Email and password accounts. Methods reject with AuthError. */
export interface PasswordAuth {
  signIn(credentials: Credentials): Promise<void>;
  signUp(credentials: Credentials): Promise<void>;
  resetPassword(email: string): Promise<void>;
}

/** Google accounts. Rejects with AuthError; resolves quietly if the person cancels. */
export interface GoogleAuth {
  signInWithGoogle(): Promise<void>;
}

export type AuthService = AuthSession & PasswordAuth & GoogleAuth;

/** An error whose message can be shown to the person as it is. */
export class AuthError extends Error {}
