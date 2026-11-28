import { onAuthStateChanged } from "firebase/auth";
import type { AppDispatch } from "../../app/store";
import { auth } from "../../services/firebase";
import { userChanged } from "./authSlice";

// Keeps Redux in step with Firebase on page load, login and logout
export function listenToAuth(dispatch: AppDispatch) {
  if (!auth) {
    dispatch(userChanged(null));
    return;
  }

  onAuthStateChanged(auth, (user) => {
    dispatch(userChanged(user ? { uid: user.uid, email: user.email } : null));
  });
}
