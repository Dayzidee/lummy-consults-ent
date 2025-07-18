// src/components/TutorProfileEditForm.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { upsertTutorProfile } from "../services/tutorService";
import { TutorProfile } from "../types";

// The validation schema is identical to the registration form.
const tutorProfileSchema = z.object({
  headline: z
    .string()
    .min(10, "Headline must be at least 10 characters long.")
    .max(100, "Headline cannot exceed 100 characters."),
  bio: z.string().min(50, "Bio must be at least 50 characters long."),
  subjects: z.string().min(3, "Please list at least one subject."),
});

type TutorProfileFormData = z.infer<typeof tutorProfileSchema>;

// The component now accepts the existing profile as a prop.
interface TutorProfileEditFormProps {
  profile: TutorProfile;
}

export const TutorProfileEditForm = ({
  profile,
}: TutorProfileEditFormProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Key difference: We use 'defaultValues' to pre-populate the form.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TutorProfileFormData>({
    resolver: zodResolver(tutorProfileSchema),
    defaultValues: {
      headline: profile.headline || "",
      bio: profile.bio || "",
      // Convert the subjects array back into a comma-separated string for the input field.
      subjects: profile.subjects?.join(", ") || "",
    },
  });

  // The mutation logic is exactly the same as the registration form.
  const mutation = useMutation({
    mutationFn: (data: Omit<TutorProfile, "user_id" | "id" | "created_at">) =>
      upsertTutorProfile(data),
    onSuccess: (updatedProfile) => {
      // Invalidate the query to ensure fresh data is shown on the dashboard.
      // We can also use queryClient.setQueryData to update the cache immediately for a better UX.
      queryClient.setQueryData(
        ["tutorProfile", profile.user_id],
        updatedProfile
      );
      queryClient.invalidateQueries({
        queryKey: ["tutorProfile", profile.user_id],
      });

      alert("Profile updated successfully!");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      alert(`Error: ${error.message}`);
    },
  });

  const onSubmit = (data: TutorProfileFormData) => {
    const processedData = {
      ...data,
      subjects: data.subjects.split(",").map((s) => s.trim()),
    };
    mutation.mutate(processedData);
  };

  return (
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
          className="flex w-full justify-center rounded-md bg-secondary py-3 px-4 font-semibold text-white shadow-sm hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50"
        >
          {mutation.isPending ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};
