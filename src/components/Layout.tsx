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
  `rounded px-3 py-1 ${
    isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
  }`;

export default function Layout() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="min-h-full">
      <nav className="flex flex-wrap gap-2 border-b p-4">
        {user ? (
          <>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end className={linkClass}>
                {link.label}
              </NavLink>
            ))}
            <span className="ml-auto self-center text-sm text-gray-500">{user.email}</span>
            <button
              type="button"
              className="rounded px-3 py-1 text-gray-700 hover:bg-gray-100"
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
