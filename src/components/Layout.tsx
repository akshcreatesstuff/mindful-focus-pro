import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/analytics", label: "Analytics" },
  { to: "/rewards", label: "Rewards" },
  { to: "/videos", label: "Videos" },
  { to: "/login", label: "Login" },
];

export default function Layout() {
  return (
    <div className="min-h-full">
      <nav className="flex flex-wrap gap-2 border-b p-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `rounded px-3 py-1 ${
                isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
