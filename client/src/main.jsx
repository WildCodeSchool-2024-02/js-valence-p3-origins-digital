import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home, { loader as homeLoader } from "./pages/Home";
import Login, { action as loginAction } from "./pages/Login";
import Register, { action as registerAction } from "./pages/Register";

import AuthProvider from "./hooks/useAuth";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardUsers, {
  loader as dashboardUsersLoader,
} from "./pages/dashboard/DashboardUsers";
import DashboardVideos, {
  loader as dashboardVideosLoard,
} from "./pages/dashboard/DashboardVideos";
import DashboardVideo from "./pages/dashboard/DashboardVideo";
import DashboardAddVideo from "./pages/dashboard/DashboardAddVideo";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/videos",
      },
      {
        path: "/about",
      },
      {
        path: "/profil",
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <DashboardUsers />,
        loader: dashboardUsersLoader,
      },
      {
        path: "videos",
        element: <DashboardVideos />,
        loader: dashboardVideosLoard,
      },
      {
        path: "videos/:id",
        element: <DashboardVideo />,
      },
      {
        path: "addVideo",
        element: <DashboardAddVideo />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
