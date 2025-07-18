// src/pages/TutorDetailPage.tsx

import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPublicTutorById } from "../services/tutorService";
import {
  User,
  Tag,
  BookOpen,
  ChevronLeft,
  WifiOff,
  SearchX,
} from "lucide-react";

export const TutorDetailPage = () => {
  const { tutorId } = useParams<{ tutorId: string }>();

  const {
    data: tutor,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["publicTutor", tutorId], // Unique key for this specific tutor
    queryFn: () => getPublicTutorById(tutorId!), // The '!' asserts tutorId is not undefined
    enabled: !!tutorId, // Only run the query if tutorId exists
  });

  if (isLoading) {
    return <div className="text-center p-12">Loading tutor profile...</div>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <WifiOff size={48} className="text-red-500" />
        <h3 className="mt-4 text-xl font-semibold text-red-600">
          Failed to Load Profile
        </h3>
        <p className="mt-1 text-gray-500">
          There was a problem connecting to the server.
        </p>
        <Link
          to="/tutors"
          className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-white"
        >
          <ChevronLeft size={16} className="mr-2" /> Back to Tutors
        </Link>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <SearchX size={48} className="text-gray-400" />
        <h3 className="mt-4 text-xl font-semibold text-gray-700">
          Tutor Not Found
        </h3>
        <p className="mt-1 text-gray-500">
          This tutor either doesn't exist or is not currently active.
        </p>
        <Link
          to="/tutors"
          className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-white"
        >
          <ChevronLeft size={16} className="mr-2" /> Back to Tutors
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <Link
          to="/tutors"
          className="mb-8 inline-flex items-center text-primary hover:underline"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to All Tutors
        </Link>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center sm:flex-row">
            {tutor.avatarUrl ? (
              <img
                src={tutor.avatarUrl}
                alt={tutor.fullName || "Tutor"}
                className="h-32 w-32 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                <User size={64} />
              </div>
            )}
            <div className="mt-6 text-center sm:mt-0 sm:ml-8 sm:text-left">
              <h1 className="text-4xl font-bold text-gray-900">
                {tutor.fullName}
              </h1>
              <p className="mt-2 text-lg text-gray-600">{tutor.headline}</p>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-8">
            <h2 className="flex items-center text-2xl font-semibold text-gray-800">
              <BookOpen className="mr-3 text-primary" /> About Me
            </h2>
            <p className="mt-4 whitespace-pre-wrap text-base text-gray-700">
              {tutor.bio || "No biography provided."}
            </p>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="flex items-center text-2xl font-semibold text-gray-800">
              <Tag className="mr-3 text-primary" /> Subjects
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {tutor.subjects && tutor.subjects.length > 0 ? (
                tutor.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="rounded-full bg-primary/10 px-4 py-1.5 text-base font-medium text-primary"
                  >
                    {subject}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No subjects listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
