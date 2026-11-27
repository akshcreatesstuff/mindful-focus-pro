import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Analytics from "../pages/Analytics/Analytics";
import Rewards from "../pages/Rewards/Rewards";
import Videos from "../pages/Videos/Videos";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/analytics",
    element: <Analytics />,
  },
  {
    path: "/rewards",
    element: <Rewards />,
  },
  {
    path: "/videos",
    element: <Videos />,
  },
]);