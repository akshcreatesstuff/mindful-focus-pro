import type { AppDispatch } from "../../app/store";
import { userChanged } from "./authSlice";
import type { AuthSession } from "./types";

// Keeps Redux in step with the login state on page load, login and logout
export function listenToAuth(session: AuthSession | null, dispatch: AppDispatch) {
  if (!session) {
    dispatch(userChanged(null));
    return;
  }

  session.observeUser((user) => dispatch(userChanged(user)));
}
