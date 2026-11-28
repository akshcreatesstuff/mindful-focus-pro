import type { ComponentType } from "react";
import Analytics from "../pages/Analytics/Analytics";
import Dashboard from "../pages/Dashboard/Dashboard";
import Rewards from "../pages/Rewards/Rewards";
import Videos from "../pages/Videos/Videos";

type AppPage = {
  path: string;
  label: string;
  Component: ComponentType;
};

// Pages that need login. Adding one here creates its route and navigation link.
export const protectedPages: AppPage[] = [
  { path: "/", label: "Dashboard", Component: Dashboard },
  { path: "/analytics", label: "Analytics", Component: Analytics },
  { path: "/rewards", label: "Rewards", Component: Rewards },
  { path: "/videos", label: "Videos", Component: Videos },
];
