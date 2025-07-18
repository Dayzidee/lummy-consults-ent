// src/pages/TutorRegistrationPage.tsx

import { TutorRegistrationForm } from "../components/TutorRegistrationForm"; // 1. Import the form

const TutorRegistrationPage = () => {
  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-8">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Become a Tutor
        </h1>
        <p className="mb-8 text-gray-600">
          Complete your profile to join our network of expert tutors.
        </p>

        {/* 2. Replace the placeholder with the actual form component */}
        <TutorRegistrationForm />
      </div>
    </div>
  );
};

export default TutorRegistrationPage;
