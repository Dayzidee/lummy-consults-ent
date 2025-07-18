// src/services/jobService.ts

import { supabase } from "../lib/supabaseClient";
import type { Job } from "../types";

/**
 * Fetches all jobs that are marked as 'published'.
 * This is for the public-facing job board.
 */
export const getPublicJobs = async (): Promise<Job[]> => {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching public jobs:", error);
    throw error;
  }
  return data || [];
};

/**
 * Fetches ALL jobs, regardless of status.
 * This is for the admin panel only.
 */
export const getAdminJobs = async (): Promise<Job[]> => {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin jobs:", error);
    throw error;
  }
  return data || [];
};

/**
 * Creates a new job posting.
 * This is for the admin panel only.
 */
export const createJob = async (
  jobData: Omit<Job, "id" | "created_at" | "posted_by">
): Promise<Job> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Admin not authenticated");

  const { data, error } = await supabase
    .from("jobs")
    .insert([{ ...jobData, posted_by: user.id }])
    .select()
    .single();

  if (error) {
    console.error("Error creating job:", error);
    throw error;
  }
  return data;
};

// We will add updateJob and deleteJob functions here later.
