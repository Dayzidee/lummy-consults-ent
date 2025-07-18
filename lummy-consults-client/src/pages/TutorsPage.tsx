// src/pages/TutorsPage.tsx

import { useQuery } from "@tanstack/react-query";
import { getPublicTutors } from "../services/tutorService";
import { TutorCard } from "../components/tutors/TutorCard";
import { WifiOff } from "lucide-react";

export const TutorsPage = () => {
  const {
    data: tutors,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["publicTutors"],
    queryFn: getPublicTutors,
  });

  const renderContent = () => {
    if (isLoading) {
      // Basic skeleton loader for a better UX
      return Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-80 animate-pulse rounded-lg bg-gray-200"
        ></div>
      ));
    }

    if (isError) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center rounded-lg bg-gray-50 p-12 text-center">
          <WifiOff size={48} className="text-red-500" />
          <h3 className="mt-4 text-xl font-semibold text-red-600">
            Failed to Load Tutors
          </h3>
          <p className="mt-1 text-gray-500">
            There was a problem connecting to the server. Please try again
            later.
          </p>
        </div>
      );
    }

    if (!tutors || tutors.length === 0) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center rounded-lg bg-gray-50 p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            No Tutors Found
          </h3>
          <p className="mt-1 text-gray-500">
            There are currently no active tutors available. Please check back
            soon!
          </p>
        </div>
      );
    }

    return tutors.map((tutor) => <TutorCard key={tutor.id} tutor={tutor} />);
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Meet Our Expert Tutors
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Find the perfect match to help you achieve your academic and
            professional goals.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
