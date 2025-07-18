// src/components/TutorRegistrationForm.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { upsertTutorProfile } from "../services/tutorService";
import type { TutorProfile } from "../types";

// CORRECTED SCHEMA: This schema ONLY includes fields that are in our 'tutor_profiles' table.
// 'email' and 'full_name' are intentionally excluded.
const tutorProfileSchema = z.object({
  headline: z
    .string()
    .min(10, "Headline must be at least 10 characters long.")
    .max(100, "Headline cannot exceed 100 characters."),
  bio: z.string().min(50, "Bio must be at least 50 characters long."),
  subjects: z.string().min(3, "Please list at least one subject."),
});

// This type is inferred from the schema above. It will not contain 'email'.
type TutorProfileFormData = z.infer<typeof tutorProfileSchema>;

export const TutorRegistrationForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TutorProfileFormData>({
    resolver: zodResolver(tutorProfileSchema),
  });

  const mutation = useMutation({
    // The data passed here now perfectly matches what upsertTutorProfile expects.
    mutationFn: (data: Omit<TutorProfile, "user_id" | "id" | "created_at">) =>
      upsertTutorProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutorProfile"] });
      alert("Profile created successfully!");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Error creating profile:", error);
      alert(`Error: ${error.message}`);
    },
  });

  // This function takes the data (without email) and prepares it for the DB.
  const onSubmit = (data: TutorProfileFormData) => {
    const processedData = {
      ...data,
      subjects: data.subjects.split(",").map((s) => s.trim()),
    };
    mutation.mutate(processedData);
  };

  return (
    // The form itself does not contain an input for 'email'.
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="headline"
          className="block text-sm font-medium text-gray-700"
        >
          Profile Headline
        </label>
        <input
          id="headline"
          type="text"
          {...register("headline")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder="e.g., Expert Math & Physics Tutor for Secondary Students"
        />
        {errors.headline && (
          <p className="mt-1 text-sm text-red-600">{errors.headline.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700"
        >
          Biography
        </label>
        <textarea
          id="bio"
          {...register("bio")}
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder="Tell us about your teaching experience, style, and qualifications..."
        />
        {errors.bio && (
          <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="subjects"
          className="block text-sm font-medium text-gray-700"
        >
          Subjects You Teach
        </label>
        <input
          id="subjects"
          type="text"
          {...register("subjects")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder="e.g., Math, English, Physics"
        />
        <p className="mt-1 text-xs text-gray-500">
          Please separate subjects with a comma.
        </p>
        {errors.subjects && (
          <p className="mt-1 text-sm text-red-600">{errors.subjects.message}</p>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting || mutation.isPending}
          className="flex w-full justify-center rounded-md bg-primary py-3 px-4 font-semibold text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
        >
          {mutation.isPending ? "Saving Profile..." : "Create My Tutor Profile"}
        </button>
      </div>
    </form>
  );
};
