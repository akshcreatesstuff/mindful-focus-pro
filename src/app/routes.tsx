import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login/Login";
import { protectedPages } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "login", element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: protectedPages.map(({ path, Component }) =>
          path === "/" ? { index: true, Component } : { path, Component },
        ),
      },
      { path: "*", element: <div className="page">Page not found</div> },
    ],
  },
]);
