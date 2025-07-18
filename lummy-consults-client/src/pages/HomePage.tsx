// src/pages/HomePage.tsx

import { Link } from "react-router-dom";
import { Briefcase, UserCheck } from "lucide-react";

const HomePage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Unlock Your Potential with Lummy Consults
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your one-stop platform for expert tutoring, professional
              recruitment, and a comprehensive educational library. We connect
              talent with opportunity.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/tutors"
                className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Find a Tutor
              </Link>
              <Link
                to="/jobs"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Explore Jobs <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Sections */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Our Services
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {/* Lummy Tutors Feature */}
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <UserCheck
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  Lummy Tutors
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Connect with highly-qualified tutors for personalized learning
                  sessions, either online or in-person. Achieve your academic
                  goals with expert guidance.
                </dd>
              </div>
              {/* Lummy Recruitment Feature */}
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Briefcase
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  Lummy Recruitment
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Find your next career move. We connect talented professionals
                  with top companies in Lagos and beyond. Explore job
                  opportunities curated just for you.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
