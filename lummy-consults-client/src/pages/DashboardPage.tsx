// src/pages/DashboardPage.tsx

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getTutorProfile } from "../services/tutorService";

// Notice this component is now much shorter and more focused!
export default function DashboardPage() {
  const { user } = useAuth();

  // The core data-fetching logic remains.
  const {
    data: tutorProfile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tutorProfile", user?.id],
    queryFn: getTutorProfile,
    enabled: !!user,
  });

  // This function is the heart of the page's UI logic.
  const renderTutorContent = () => {
    if (isLoading) {
      return <p className="text-gray-500">Loading your profile...</p>;
    }

    if (isError) {
      return (
        <p className="text-red-500">
          Error loading profile:{" "}
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
      );
    }

    if (tutorProfile) {
      return (
        <div className="text-left">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              Profile Summary
            </h2>
            <Link
              to="/dashboard/tutor-profile"
              className="rounded-md bg-secondary px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              Edit Full Profile
            </Link>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 p-4">
            <div>
              <h3 className="font-semibold text-gray-600">Headline</h3>
              <p className="text-gray-800">
                {tutorProfile.headline || (
                  <span className="text-gray-400">Not set</span>
                )}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-600">Subjects</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {tutorProfile.subjects && tutorProfile.subjects.length > 0 ? (
                  tutorProfile.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                    >
                      {subject}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">No subjects listed</span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-600">Biography</h3>
              <p className="whitespace-pre-wrap text-gray-800">
                {tutorProfile.bio || (
                  <span className="text-gray-400">Not set</span>
                )}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // The "Become a Tutor" CTA remains unchanged.
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Ready to Start Teaching?
        </h2>
        <p className="mt-2 text-gray-600">
          Join our community of expert tutors and start making an impact.
        </p>
        <Link
          to="/dashboard/tutor-registration"
          className="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-white shadow-md transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Become a Tutor
        </Link>
      </div>
    );
  };

  // The main return is now extremely simple. It just renders a single content card.
  // All other layout is handled by DashboardLayout.
  return (
    <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg md:p-8">
      {renderTutorContent()}
    </div>
  );
}
