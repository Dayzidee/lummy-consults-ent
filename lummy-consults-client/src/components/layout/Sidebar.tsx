// src/components/layout/Sidebar.tsx

import { NavLink, useNavigate, NavLinkProps } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabaseClient";
import { useUIStore } from "../../stores/useUIStore";
import {
  LogOut,
  User,
  LayoutDashboard,
  X,
  Briefcase,
  Library,
} from "lucide-react";
import { useWindowSize } from "../../hooks/useWindowSize"; // We will create this custom hook

// --- NEW Reusable NavLink Component ---
const AppNavLink = (props: NavLinkProps & { children: React.ReactNode }) => {
  const { toggleSidebar } = useUIStore();
  const { width } = useWindowSize();

  const handleClick = () => {
    // Only close sidebar on mobile when a link is clicked
    if (width < 768) {
      // 768px is the 'md' breakpoint
      toggleSidebar();
    }
  };

  const navLinkClasses =
    "flex items-center px-4 py-2.5 text-gray-200 rounded-lg hover:bg-primary-dark transition-colors duration-200";
  const activeNavLinkClasses = "bg-primary-dark shadow-inner";

  return (
    <NavLink
      {...props}
      onClick={handleClick}
      className={({ isActive }) =>
        `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
      }
    >
      {props.children}
    </NavLink>
  );
};

export const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    // No changes to this part yet
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-primary text-white transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0`}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div>
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Lummy</h1>
            <button
              onClick={toggleSidebar}
              className="text-gray-300 hover:text-white md:hidden"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-8 flex flex-col items-center">
            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-primary-dark text-3xl font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <p className="font-semibold">{user?.email}</p>
          </div>

          {/* --- USE THE NEW AppNavLink COMPONENT --- */}
          <nav className="space-y-2">
            <AppNavLink to="/dashboard" end>
              <LayoutDashboard className="mr-3" size={20} />
              <span>Dashboard</span>
            </AppNavLink>
            <AppNavLink to="/dashboard/tutor-profile">
              <User className="mr-3" size={20} />
              <span>Edit Profile</span>
            </AppNavLink>
            <AppNavLink to="/jobs">
              <Briefcase className="mr-3" size={20} />
              <span>Job Board</span>
            </AppNavLink>
            <AppNavLink to="/dashboard/library">
              <Library className="mr-3" size={20} />
              <span>Library</span>
            </AppNavLink>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center px-4 py-2.5 text-gray-200 rounded-lg hover:bg-primary-dark transition-colors duration-200"
        >
          <LogOut className="mr-3" size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
