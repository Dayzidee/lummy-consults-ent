// src/components/ProtectedRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// 1. Update the function to accept a 'children' prop.
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Or a full-page spinner
    return <div>Authenticating...</div>;
  }

  // 2. If the user exists, render the 'children' that were passed in.
  // We no longer use <Outlet /> here.
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
