import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import AuthForm from "../../features/auth/components/AuthForm";
import { useAuthService } from "../../features/auth/useAuthService";

// Decides what the /login page shows
export default function Login() {
  const { user, ready } = useAppSelector((state) => state.auth);
  const authService = useAuthService();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

  if (!ready) {
    return <div className="page text-muted">Loading…</div>;
  }

  // Runs after a successful login too: go back to the page that was asked for
  if (user) {
    return <Navigate to={from ?? "/"} replace />;
  }

  if (!authService) {
    return (
      <div className="page">
        Login is not set up yet. Add your Firebase values to <code>.env.local</code>{" "}
        (see the README) and restart the app.
      </div>
    );
  }

  return <AuthForm auth={authService} />;
}
