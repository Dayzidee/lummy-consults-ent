// src/pages/admin/ManageJobsPage.tsx

import { useQuery } from "@tanstack/react-query";
import { getAdminJobs } from "../../services/jobService";
import { CreateJobForm } from "../../components/jobs/CreateJobForm";
import { Job } from "../../types";
import { format } from "date-fns";

// A simple component to display the list of jobs
const JobsTable = ({ jobs }: { jobs: Job[] }) => (
  <div className="mt-8 rounded-lg border border-gray-200 bg-white shadow-sm">
    <h2 className="p-6 text-xl font-semibold text-gray-800">Existing Jobs</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Date Posted
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {job.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {job.company || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    job.status === "published"
                      ? "bg-green-100 text-green-800"
                      : job.status === "draft"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {job.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(job.created_at), "MMM d, yyyy")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {/* We'll add Edit/Delete functionality later */}
                <a href="#" className="text-primary hover:text-primary-dark">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ManageJobsPage = () => {
  // Fetch all jobs for the admin view
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminJobs"],
    queryFn: getAdminJobs,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Manage Job Opportunities
      </h1>
      <p className="mt-1 text-gray-600">
        Create, edit, and manage job postings for the public job board.
      </p>

      <div className="mt-8">
        <CreateJobForm />
      </div>

      {isLoading && <p className="mt-8 text-center">Loading jobs...</p>}
      {isError && (
        <p className="mt-8 text-center text-red-500">Error loading jobs.</p>
      )}
      {jobs && jobs.length > 0 && <JobsTable jobs={jobs} />}
      {jobs && jobs.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No jobs posted yet.</p>
      )}
    </div>
  );
};

export default ManageJobsPage;
