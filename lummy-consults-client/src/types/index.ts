// src/types/index.ts

// This type is for form handling, so it's fine as is.
export type SignupFormData = {
  email: string;
  password: string;
};

// --- REWORKED TutorProfile TYPE ---
// This type definition now accurately reflects the columns
// in our 'tutor_profiles' table in the Supabase database.
export interface TutorProfile {
  /**
   * The unique identifier for the tutor profile row (UUID).
   */
  id: string;

  /**
   * The foreign key linking to the user in the 'auth.users' table (UUID).
   */
  user_id: string;

  /**
   * The timestamp of when the profile was created (ISO 8601 string).
   */
  created_at: string;

  /**
   * A short, professional headline for the tutor.
   * Corresponds to a 'text' column, which can be null.
   */
  headline: string | null;

  /**
   * A detailed biography for the tutor.
   * Corresponds to a 'text' column, which can be null.
   */
  bio: string | null;

  /**
   * A list of subjects the tutor teaches.
   * Corresponds to a 'text[]' (array of text) column, which can be null.
   */
  subjects: string[] | null;

  // --- NEW FIELDS ADDED ---
  status: "pending" | "active" | "inactive"; // Matches our ENUM type
  full_name: string | null; // From auth.users, managed by trigger
  avatar_url: string | null; // From auth.users, managed by trigger
}

// src/types/index.ts
// ... (other types) ...

// This new type represents the combined data for a public-facing tutor card.
export interface PublicTutorProfile {
  id: string;
  headline: string | null;
  subjects: string[] | null;
  fullName: string | null; 
  avatarUrl: string | null; 
}

export interface TutorDetailProfile {
  id: string;
  headline: string | null;
  bio: string | null; // <-- The main addition
  subjects: string[] | null;
  fullName: string | null;
  avatarUrl: string | null;
}

export interface Job {
  id: string;
  created_at: string;
  title: string;
  description: string;
  company: string | null;
  location: string | null;
  status: "draft" | "published" | "archived";
  posted_by: string | null;
}
// NOTE: We have removed 'full_name' and 'email' from this type.
// That information should be sourced from the main 'user' object provided
// by Supabase Auth to avoid data duplication and keep our profile table clean.
