// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// --- Providers and Core Components ---
import App from "./App.tsx";
import { AuthProvider } from "./providers/AuthProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.tsx";
import "./index.css";

// --- Layouts ---
import { PublicLayout } from "./components/layout/PublicLayout.tsx";
import { DashboardLayout } from "./components/layout/DashboardLayout.tsx";

// --- Pages ---
import LoginPage from "./pages/auth/LoginPage.tsx";
import SignupPage from "./pages/auth/SignupPage.tsx";
import { TutorsPage } from "./pages/TutorsPage.tsx";
import { TutorDetailPage } from "./pages/TutorDetailPage.tsx";
import JobBoardPage from "./pages/JobBoardPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import TutorRegistrationPage from "./pages/TutorRegistrationPage.tsx";
import TutorProfilePage from "./pages/TutorProfilePage.tsx";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.tsx";
import ManageJobsPage from "./pages/admin/ManageJobsPage.tsx";
import HomePage from "./pages/HomePage";

// Create a single QueryClient instance
const queryClient = new QueryClient();

// Define the router configuration with a clean and logical structure
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // --- 1. PUBLIC ROUTES (with Global Header) ---
      {
        element: <PublicLayout />,
        children: [
          { index: true, element: <HomePage /> }, // Set Tutors page as the default home page
          { path: "tutors", element: <TutorsPage /> },
          { path: "tutors/:tutorId", element: <TutorDetailPage /> },
          { path: "jobs", element: <JobBoardPage /> },
        ],
      },

      // --- 2. AUTH ROUTES (stand-alone, no layout) ---
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },

      // --- 3. PROTECTED USER DASHBOARD ---
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "tutor-registration", element: <TutorRegistrationPage /> },
          { path: "tutor-profile", element: <TutorProfilePage /> },
        ],
      },

      // --- 4. PROTECTED ADMIN DASHBOARD ---
      {
        path: "admin",
        element: (
          <AdminProtectedRoute>
            {/* For now, admin pages can use the main DashboardLayout. 
                We can create a dedicated AdminLayout later if needed. */}
            <DashboardLayout />
          </AdminProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "jobs", element: <ManageJobsPage /> },
        ],
      },
    ],
  },
]);

// The render block is correct and remains unchanged.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
