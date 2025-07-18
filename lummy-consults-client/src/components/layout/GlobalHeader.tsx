// src/components/layout/GlobalHeader.tsx

import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LogIn, User, LayoutDashboard } from "lucide-react";

export const GlobalHeader = () => {
  const { user } = useAuth();

  const navLinkClasses = "text-gray-600 transition hover:text-primary";
  const activeNavLinkClasses = "text-primary font-semibold";

  return (
    <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="text-2xl font-bold text-primary">
          Lummy Consults
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          {/* --- ADD THIS NEW LINK --- */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/tutors"
            className={({ isActive }) =>
              `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
            }
          >
            Tutors
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
            }
          >
            Job Board
          </NavLink>
        </nav>
    
        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <Link
              to="/dashboard"
              className="flex items-center rounded-md bg-secondary py-2 px-4 font-semibold text-white shadow-sm transition hover:bg-secondary-dark"
            >
              <LayoutDashboard size={18} className="mr-2" />
              <span>Dashboard</span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center text-gray-600 transition hover:text-primary"
              >
                <LogIn size={18} className="mr-1" />
                Login
              </Link>
              <Link
                to="/signup"
                className="hidden rounded-md bg-primary py-2 px-4 font-semibold text-white shadow-sm transition hover:bg-primary-dark sm:block"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
