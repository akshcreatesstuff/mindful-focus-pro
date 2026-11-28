import { signOut } from "firebase/auth";
import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { auth } from "../services/firebase";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/analytics", label: "Analytics" },
  { to: "/rewards", label: "Rewards" },
  { to: "/videos", label: "Videos" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "nav-link-active" : "nav-link";

export default function Layout() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="min-h-full">
      <nav className="flex flex-wrap items-center gap-2 border-b border-line bg-surface p-4">
        <span className="mr-4 text-lg font-semibold text-brand">Mindful Focus</span>
        {user ? (
          <>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end className={linkClass}>
                {link.label}
              </NavLink>
            ))}
            <span className="ml-auto text-sm text-muted">{user.email}</span>
            <button
              type="button"
              className="nav-link"
              onClick={() => auth && signOut(auth)}
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
