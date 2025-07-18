// src/services/tutorService.ts

import { supabase } from "../lib/supabaseClient";
import type {
  TutorProfile,
  PublicTutorProfile,
  TutorDetailProfile,
} from "../types";

/**
 * Fetches the tutor profile for the currently authenticated user.
 */
export const getTutorProfile = async (): Promise<TutorProfile | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("tutor_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching tutor profile:", error);
    throw error;
  }

  // With the corrected TutorProfile type, 'data' now matches the return type.
  return data;
};

/**
 * Creates or updates a tutor profile for the currently authenticated user.
 */
export const upsertTutorProfile = async (
  // The Omit type now correctly excludes all system-managed fields.
  profileData: Omit<
    TutorProfile,
    "user_id" | "id" | "created_at" | "status" | "full_name" | "avatar_url"
  >
): Promise<TutorProfile> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("tutor_profiles")
    .upsert({ ...profileData, user_id: user.id }, { onConflict: "user_id" })
    .select()
    .single();

  if (error) {
    console.error("Error upserting tutor profile:", error);
    throw error;
  }

  if (!data) {
    throw new Error("Upsert operation did not return a profile.");
  }

  return data;
};

/**
 * Fetches all active tutor profiles.
 */
export const getPublicTutors = async (): Promise<PublicTutorProfile[]> => {
  const { data, error } = await supabase
    .from("tutor_profiles")
    .select("id, headline, subjects, full_name, avatar_url")
    .eq("status", "active");

  if (error) {
    console.error("Error fetching public tutors:", error);
    throw new Error(error.message);
  }

  if (!data) {
    return [];
  }

  const profiles: PublicTutorProfile[] = data.map((profile) => ({
    id: profile.id,
    headline: profile.headline,
    subjects: profile.subjects,
    fullName: profile.full_name,
    avatarUrl: profile.avatar_url,
  }));

  return profiles;
};

/**
* Fetches a single public tutor profile by its ID.
 * Crucially, it only returns a profile if its status is 'active'.
 */
export const getPublicTutorById = async (tutorId: string): Promise<TutorDetailProfile | null> => {
  const { data, error } = await supabase
    .from('tutor_profiles')
    .select('id, headline, bio, subjects, full_name, avatar_url')
    .eq('id', tutorId)
    .eq('status', 'active') // <-- Crucial security check!
    .single(); // We expect only one or zero results.

  if (error && error.code !== 'PGRST116') { // Ignore "no rows found" error
    console.error('Error fetching single tutor profile:', error);
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }
  
  // Map from snake_case to camelCase
  return {
    id: data.id,
    headline: data.headline,
    bio: data.bio,
    subjects: data.subjects,
    fullName: data.full_name,
    avatarUrl: data.avatar_url,
  };
};