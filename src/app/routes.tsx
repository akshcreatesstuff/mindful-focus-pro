import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Analytics from "../pages/Analytics/Analytics";
import Rewards from "../pages/Rewards/Rewards";
import Videos from "../pages/Videos/Videos";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "login", element: <Login /> },
      { path: "analytics", element: <Analytics /> },
      { path: "rewards", element: <Rewards /> },
      { path: "videos", element: <Videos /> },
      { path: "*", element: <div className="p-6">Page not found</div> },
    ],
  },
]);
