// src/pages/JobBoardPage.tsx

import { useQuery } from "@tanstack/react-query";
import { getPublicJobs } from "../services/jobService";
import { JobCard } from "../components/jobs/JobCard";
import { Briefcase, WifiOff } from "lucide-react";

const JobBoardPage = () => {
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["publicJobs"],
    queryFn: getPublicJobs,
  });

  const renderContent = () => {
    if (isLoading) {
      // Skeleton loader for better UX
      return Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-56 animate-pulse rounded-lg bg-gray-200"
        ></div>
      ));
    }

    if (isError) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-sm">
          <WifiOff size={48} className="text-red-500" />
          <h3 className="mt-4 text-xl font-semibold text-red-600">
            Failed to Load Jobs
          </h3>
          <p className="mt-1 text-gray-500">
            There was a problem connecting to the server. Please try again
            later.
          </p>
        </div>
      );
    }

    if (!jobs || jobs.length === 0) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-sm">
          <Briefcase size={48} className="text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold text-gray-700">
            No Open Positions
          </h3>
          <p className="mt-1 text-gray-500">
            There are currently no job openings available. Please check back
            soon!
          </p>
        </div>
      );
    }

    return jobs.map((job) => <JobCard key={job.id} job={job} />);
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Job Board
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Explore exciting career opportunities with Lummy Recruitment.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default JobBoardPage; // Using default export as per our convention
