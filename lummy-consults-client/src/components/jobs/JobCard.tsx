// src/components/jobs/JobCard.tsx

import { MapPin, Building } from "lucide-react";
import { Job } from "../../types";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <h3 className="text-lg font-bold text-primary hover:underline">
          {/* We'll make this a link to a detail page later */}
          <a href="#">{job.title}</a>
        </h3>
        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
          {job.company && (
            <span className="flex items-center">
              <Building size={16} className="mr-1.5" /> {job.company}
            </span>
          )}
          {job.location && (
            <span className="flex items-center">
              <MapPin size={16} className="mr-1.5" /> {job.location}
            </span>
          )}
        </div>
      </div>
      <p className="mt-4 flex-grow text-gray-700 line-clamp-3">
        {job.description}
      </p>
      <div className="mt-4 border-t border-gray-100 pt-4 text-right text-xs text-gray-400">
        Posted{" "}
        {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
      </div>
    </div>
  );
};
