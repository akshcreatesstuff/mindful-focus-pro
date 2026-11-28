import { Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useAuthService } from "../features/auth/useAuthService";
import StreakProvider from "../features/streak/StreakProvider";
import AppShell from "./AppShell";

export default function Layout() {
  const user = useAppSelector((state) => state.auth.user);
  const authService = useAuthService();

  if (!user) {
    return (
      <>
        <header className="public-bar">Mindful Focus</header>
        <main>
          <Outlet />
        </main>
      </>
    );
  }

  return (
    // The key gives each account its own streak
    <StreakProvider key={user.uid} userId={user.uid}>
      <AppShell email={user.email} onLogout={() => authService?.signOut()}>
        <Outlet />
      </AppShell>
    </StreakProvider>
  );
}
