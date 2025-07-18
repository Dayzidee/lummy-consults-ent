// src/components/layout/DashboardLayout.tsx

import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useUIStore } from "../../stores/useUIStore";

export const DashboardLayout = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* --- NEW: Mobile Overlay --- */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden"
        ></div>
      )}
    </div>
  );
};
