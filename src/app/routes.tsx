import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
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
      { path: "login", element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "analytics", element: <Analytics /> },
          { path: "rewards", element: <Rewards /> },
          { path: "videos", element: <Videos /> },
        ],
      },
      { path: "*", element: <div className="page">Page not found</div> },
    ],
  },
]);
