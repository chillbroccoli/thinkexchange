import { z } from "zod";

export const bookmarkResponse = z.object({
  id: z.string(),
  userId: z.string(),
  projectId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type BookmarkResponse = z.infer<typeof bookmarkResponse>;
