import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { protectedPages } from "../app/pages";
import { useAuthService } from "../features/auth/useAuthService";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "nav-link-active" : "nav-link";

export default function Layout() {
  const user = useAppSelector((state) => state.auth.user);
  const authService = useAuthService();

  return (
    <div className="min-h-full">
      <nav className="flex flex-wrap items-center gap-2 border-b border-line bg-surface p-4">
        <span className="mr-4 text-lg font-semibold text-brand">Mindful Focus</span>
        {user ? (
          <>
            {protectedPages.map(({ path, label }) => (
              <NavLink key={path} to={path} end className={linkClass}>
                {label}
              </NavLink>
            ))}
            <span className="ml-auto text-sm text-muted">{user.email}</span>
            <button
              type="button"
              className="nav-link"
              onClick={() => authService?.signOut()}
            >
              Log out
            </button>
          </>
        ) : (
          <NavLink to="/login" className={linkClass}>
            Log in
          </NavLink>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
