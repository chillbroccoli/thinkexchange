import { Project } from "@prisma/client";

export type ProjectsFeed = {
  projects: Project[];
  nextCursor?: string;
};
