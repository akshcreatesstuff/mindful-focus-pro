import { useState, type ReactNode } from "react";
import { useStreak } from "../features/streak/useStreak";
import Sidebar from "./Sidebar";

type Props = {
  email: string | null;
  onLogout: () => void;
  children: ReactNode;
};

// Sidebar on wide screens; top bar with a slide-in menu on phones
export default function AppShell({ email, onLogout, children }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { streak } = useStreak();

  return (
    <>
      <div
        className={menuOpen ? "overlay visible" : "overlay"}
        onClick={() => setMenuOpen(false)}
      />

      <div className="topbar">
        <button
          type="button"
          className={menuOpen ? "hamburger open" : "hamburger"}
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <span className="topbar-title">Mindful Focus</span>
        <div className="topbar-streak">🔥 {streak} day streak</div>
      </div>

      <div className="app-shell">
        <Sidebar
          open={menuOpen}
          email={email}
          onNavigate={() => setMenuOpen(false)}
          onLogout={onLogout}
        />
        <main className="main">{children}</main>
      </div>
    </>
  );
}
