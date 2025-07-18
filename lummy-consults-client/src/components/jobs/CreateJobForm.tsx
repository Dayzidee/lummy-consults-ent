// src/components/jobs/CreateJobForm.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "../../services/jobService";
import { Job } from "../../types";

// Zod schema for validating the new job form
const jobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  company: z.string().optional(),
  location: z.string().min(2, "Location is required."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters long."),
  status: z.enum(["draft", "published", "archived"]),
});

type JobFormData = z.infer<typeof jobSchema>;

export const CreateJobForm = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      status: "draft", // Default to draft
    },
  });

  const createJobMutation = useMutation({
    mutationFn: (newJob: Omit<Job, "id" | "created_at" | "posted_by">) =>
      createJob(newJob),
    onSuccess: () => {
      alert("Job created successfully!");
      // Invalidate the 'adminJobs' query to refetch the jobs list
      queryClient.invalidateQueries({ queryKey: ["adminJobs"] });
      reset(); // Clear the form after successful submission
    },
    onError: (error) => {
      alert(`Error creating job: ${error.message}`);
    },
  });

  const onSubmit = (data: JobFormData) => {
    createJobMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Create New Job Posting
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Title */}
        <div className="md:col-span-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="mt-1 w-full rounded-md border-gray-300"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700"
          >
            Company (Optional)
          </label>
          <input
            id="company"
            type="text"
            {...register("company")}
            className="mt-1 w-full rounded-md border-gray-300"
          />
        </div>
        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            id="location"
            type="text"
            {...register("location")}
            className="mt-1 w-full rounded-md border-gray-300"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location.message}
            </p>
          )}
        </div>
        {/* Description */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Job Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={6}
            className="mt-1 w-full rounded-md border-gray-300"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>
        {/* Status */}
        <div className="md:col-span-2">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="mt-1 w-full rounded-md border-gray-300"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting || createJobMutation.isPending}
          className="w-full rounded-md bg-primary py-2 px-4 font-semibold text-white shadow-sm hover:bg-primary-dark disabled:opacity-50"
        >
          {createJobMutation.isPending ? "Creating Job..." : "Create Job"}
        </button>
      </div>
    </form>
  );
};
