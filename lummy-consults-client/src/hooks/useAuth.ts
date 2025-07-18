// src/hooks/useAuth.ts

import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../providers/AuthProvider";

/**
 * Custom hook for accessing the Auth context.
 * This hook encapsulates the useContext logic and provides a single,
 * consistent way for components to get authentication state.
 *
 * It also includes a crucial safeguard to ensure it's only used
 * within a component tree wrapped by AuthProvider.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // If the hook is used outside of the AuthProvider, the context will be undefined.
  // We throw an error to catch this common bug during development.
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
