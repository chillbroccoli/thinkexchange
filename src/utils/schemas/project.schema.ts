import { z } from "zod";

const projectResponseCore = {
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  content: z.string(),
  tags: z.array(z.object({ id: z.string(), name: z.string() })),
  likes: z.array(z.object({ id: z.string(), userId: z.string(), projectId: z.string() })),
  bookmarks: z.array(z.object({ id: z.string(), userId: z.string(), projectId: z.string() })),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    image: z.string(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
  _count: z.object({
    comments: z.number(),
    likes: z.number(),
    bookmarks: z.number(),
  }),
};

export const createProjectSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(4, "Title must be at least 4 characters long"),
  description: z
    .string({ required_error: "Description is required" })
    .min(50, "Description must be at least 50 characters long"),
  tags: z
    .array(z.object({ id: z.string(), name: z.string() }))
    .min(1, "At least 1 tag is required")
    .max(4, "Maximum 4 tags allowed"),
  content: z
    .string({ required_error: "Content is required" })
    .min(200, "Content must be at least 200 characters long"),
});

export const projectStatsSchema = z.object({
  likes: z.array(z.object({ id: z.string(), userId: z.string(), projectId: z.string() })),
  bookmarks: z.array(z.object({ id: z.string(), userId: z.string(), projectId: z.string() })),
  _count: z.object({
    comments: z.number(),
    likes: z.number(),
    bookmarks: z.number(),
  }),
});

export const projectResponseSchema = z.object({
  ...projectResponseCore,
});

export const projectsFeedResponseSchema = z.object({
  projects: z.array(projectResponseSchema),
  nextCursor: z.number().nullable(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type ProjectResponse = z.infer<typeof projectResponseSchema>;
export type ProjectsFeedResponse = z.infer<typeof projectsFeedResponseSchema>;
export type ProjectStatsResponse = z.infer<typeof projectStatsSchema>;
