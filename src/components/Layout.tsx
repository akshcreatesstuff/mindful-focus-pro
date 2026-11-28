import { Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useDataServices } from "../app/useDataServices";
import { useAuthService } from "../features/auth/useAuthService";
import ProgressProvider from "../features/progress/ProgressProvider";
import AppShell from "./AppShell";

export default function Layout() {
  const user = useAppSelector((state) => state.auth.user);
  const authService = useAuthService();
  const services = useDataServices();

  if (!user || !services) {
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
    // The key gives each account its own data
    <ProgressProvider key={user.uid} user={user} repository={services.progress}>
      <AppShell email={user.email} onLogout={() => authService?.signOut()}>
        <Outlet />
      </AppShell>
    </ProgressProvider>
  );
}
