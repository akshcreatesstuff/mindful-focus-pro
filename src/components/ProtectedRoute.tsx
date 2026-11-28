import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function ProtectedRoute() {
  const { user, ready } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Wait, otherwise a logged-in user is sent to /login on every refresh
  if (!ready) {
    return <div className="page text-muted">Loading…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
