import { z } from "zod";

export const likeResponse = z.object({
  id: z.string(),
  userId: z.string(),
  projectId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type LikeResponse = z.infer<typeof likeResponse>;
