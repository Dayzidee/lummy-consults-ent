// src/components/layout/Header.tsx

import { Menu } from "lucide-react";
import { useUIStore } from "../../stores/useUIStore";

export const Header = () => {
  const { toggleSidebar } = useUIStore();

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm md:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-bold text-primary">Lummy</h1>
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-primary"
        >
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
};
