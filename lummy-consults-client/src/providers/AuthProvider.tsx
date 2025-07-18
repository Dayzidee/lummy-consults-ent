// src/providers/AuthProvider.tsx

import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

// EXPORTED: The shape of the context value, now exported for use in the hook.
export type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
};

// EXPORTED & UPDATED: The context is now exported.
// The default value is set to `undefined` to work with the error check in our new useAuth hook.
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// The AuthProvider component remains functionally identical.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Your robust logic for getting the initial session and setting up the listener is perfect.
    // No changes are needed here.
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    loading,
  };

  // Your excellent logic for preventing child render during initial load is preserved.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// REMOVED: The `useAuth` hook function has been moved to `src/hooks/useAuth.ts`.
