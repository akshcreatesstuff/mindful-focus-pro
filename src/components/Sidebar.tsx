import { Link, NavLink, useLocation } from "react-router-dom";
import { protectedPages } from "../app/pages";
import { practices } from "../features/practices/practices";
import { streakOf } from "../features/progress/progressModel";
import { useProgress } from "../features/progress/useProgress";

type Props = {
  open: boolean;
  email: string | null;
  onNavigate: () => void;
  onLogout: () => void;
};

export default function Sidebar({ open, email, onNavigate, onLogout }: Props) {
  const { progress } = useProgress();
  const { pathname, hash } = useLocation();
  const activeHash = hash || `#${practices[0].id}`;

  return (
    <nav className={open ? "sidebar open" : "sidebar"}>
      <div className="sidebar-logo">
        <div className="wordmark">
          Mindful
          <br />
          Focus
        </div>
        <div className="tagline">Focus &amp; Productivity Practices</div>
      </div>

      <div className="streak-badge">
        <div>
          <div className="streak-num">{progress ? streakOf(progress) : "–"}</div>
          <div className="streak-label">sessions completed 🔥</div>
        </div>
      </div>

      <div className="nav-section-label">Practices</div>
      {practices.map(({ id, icon, title }) => (
        <Link
          key={id}
          to={`/#${id}`}
          onClick={onNavigate}
          className={pathname === "/" && activeHash === `#${id}` ? "nav-link active" : "nav-link"}
        >
          <span className="nav-icon" aria-hidden="true">{icon}</span> {title}
        </Link>
      ))}

      <div className="nav-section-label">App</div>
      {protectedPages.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          end
          onClick={onNavigate}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          {label}
        </NavLink>
      ))}

      <div className="nav-user">
        <div className="nav-email">{email}</div>
        <button type="button" className="nav-link" onClick={onLogout}>
          Log out
        </button>
      </div>
    </nav>
  );
}
