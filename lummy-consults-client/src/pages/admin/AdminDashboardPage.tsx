// src/pages/admin/AdminDashboardPage.tsx
import { Link } from "react-router-dom";

const AdminDashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p>Welcome, Admin! This is the central control panel.</p>
      <div className="mt-6">
        <Link
          to="/admin/jobs"
          className="rounded-md bg-primary px-4 py-2 font-semibold text-white"
        >
          Manage Jobs
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
