// src/pages/TutorProfilePage.tsx

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { getTutorProfile } from "../services/tutorService";
import { Link } from "react-router-dom";
// 1. Import our new form component.
import { TutorProfileEditForm } from "../components/TutorProfileEditForm";

const TutorProfilePage = () => {
  const { user } = useAuth();

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

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-gray-500">Loading your profile...</p>;
    }

    if (isError) {
      return (
        <div className="text-center text-red-500">
          <p>
            Error loading profile:{" "}
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
          <Link
            to="/dashboard"
            className="mt-4 inline-block text-primary hover:underline"
          >
            Go back to Dashboard
          </Link>
        </div>
      );
    }

    if (!tutorProfile) {
      return (
        <div className="text-center">
          <p className="text-gray-700">No tutor profile found.</p>
          <Link
            to="/dashboard/tutor-registration"
            className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-white"
          >
            Create a Profile
          </Link>
        </div>
      );
    }

    // 2. If data is successfully loaded, render the form and pass the profile data to it.
    return (
      <div>
        <p className="mb-6 text-gray-600">
          Update your public-facing tutor profile here.
        </p>
        <TutorProfileEditForm profile={tutorProfile} />
      </div>
    );
  };

  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-8">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Edit Your Tutor Profile
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default TutorProfilePage;
