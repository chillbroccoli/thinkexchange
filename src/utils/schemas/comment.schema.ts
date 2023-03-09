import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(1).max(500),
});

export const commentResponse = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    image: z.string(),
  }),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1).max(500),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type CommentResponse = z.infer<typeof commentResponse>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
