// src/App.tsx
import { Outlet } from "react-router-dom";

function App() {
  // The Outlet component is essential. It acts as a placeholder
  // where child routes will be rendered.
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
