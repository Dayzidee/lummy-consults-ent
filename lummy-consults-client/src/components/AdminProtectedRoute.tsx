// src/components/AdminProtectedRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { getTutorProfile } from "../services/tutorService";

// 1. Update the function to accept a 'children' prop.
const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["tutorProfile", user?.id],
    queryFn: getTutorProfile,
    enabled: !!user,
  });

  const isLoading = authLoading || profileLoading;

  if (isLoading) {
    return <div>Loading & Verifying Access...</div>;
  }

  // 2. If the user is an admin, render the 'children' passed in.
  if (user && profile?.role === "admin") {
    return <>{children}</>;
  }

  // If not an admin, redirect to the user's dashboard.
  return <Navigate to="/dashboard" replace />;
};

export default AdminProtectedRoute;
