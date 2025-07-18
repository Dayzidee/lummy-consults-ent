// src/components/layout/PublicLayout.tsx

import { Outlet } from "react-router-dom";
import { GlobalHeader } from "./GlobalHeader";

export const PublicLayout = () => {
  return (
    <div>
      <GlobalHeader />
      <main>
        {/* All public pages will be rendered here */}
        <Outlet />
      </main>
      {/* We can add a GlobalFooter component here later */}
    </div>
  );
};
