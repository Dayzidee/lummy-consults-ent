// src/components/tutors/TutorCard.tsx

import { User } from "lucide-react";
import { PublicTutorProfile } from "../../types";
import { Link } from "react-router-dom";

interface TutorCardProps {
  tutor: PublicTutorProfile;
}

export const TutorCard = ({ tutor }: TutorCardProps) => {
  return (
    <div className="flex h-full transform flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-center">
          {tutor.avatarUrl ? (
            <img
              src={tutor.avatarUrl}
              alt={tutor.fullName || "Tutor"}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-500">
              <User size={32} />
            </div>
          )}
          <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-900">
              {tutor.fullName}
            </h3>
          </div>
        </div>

        <p className="mt-4 h-12 text-sm text-gray-600 line-clamp-2">
          {tutor.headline}
        </p>

        <div className="mt-4 border-t border-gray-100 pt-4">
          <h4 className="mb-2 text-xs font-semibold uppercase text-gray-400">
            Subjects
          </h4>
          <div className="flex flex-wrap gap-2">
            {tutor.subjects && tutor.subjects.length > 0 ? (
              tutor.subjects.slice(0, 3).map(
                (
                  subject // Show max 3 subjects
                ) => (
                  <span
                    key={subject}
                    className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary"
                  >
                    {subject}
                  </span>
                )
              )
            ) : (
              <span className="text-sm text-gray-400">No subjects listed</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto p-6 pt-0">
        <Link
          to={`/tutors/${tutor.id}`} // We will create this route later
          className="block w-full rounded-md bg-secondary py-2 text-center font-semibold text-white transition hover:bg-secondary-dark"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};
