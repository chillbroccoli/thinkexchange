import type { NextApiHandler } from "next";

import { CreateProjectInput } from "~/utils/schemas/project.schema";
import { getServerAuthSession } from "~/utils/server/auth";
import { prisma } from "~/utils/server/db";

const handler: NextApiHandler = async (req, res) => {
  const { slug } = req.query as { slug: string };
  const session = await getServerAuthSession({ req, res });

  if (req.method !== "GET" && req.method !== "DELETE" && req.method !== "PATCH") {
    res.status(405).json({ message: "Method not allowed" });

    return;
  }

  if (req.method === "GET") {
    try {
      const project = await prisma.project.findUnique({
        where: {
          slug,
        },
        include: {
          tags: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          likes: true,
          bookmarks: true,
          _count: true,
        },
      });

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      return res.status(200).json(project);
    } catch (err) {
      return res.status(500).json({ message: "Couldn't get project" });
    }
  }

  if (req.method === "PATCH") {
    if (!session) {
      res.status(401).json({ message: "You must be logged in" });

      return;
    }

    try {
      const project = await prisma.project.findUnique({
        where: {
          slug,
        },
      });

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      if (project.userId !== session.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const { title, description, content, tags } = req.body as CreateProjectInput;

      const tagsIds = tags.map((tag) => tag.id);

      const foundTags = await prisma.tag.findMany({
        where: {
          id: {
            in: tagsIds,
          },
        },
      });

      const updatedProject = await prisma.project.update({
        where: {
          slug,
        },
        data: {
          title,
          description,
          content,
          tags: {
            connect: foundTags.map((tag) => ({ id: tag.id })),
          },
        },
        include: {
          tags: true,
        },
      });

      return res.status(200).json(updatedProject);
    } catch (err) {
      return res.status(500).json({ message: "Couldn't update project" });
    }
  }

  if (req.method === "DELETE") {
    if (!session) {
      res.status(401).json({ message: "You must be logged in" });

      return;
    }

    try {
      const project = await prisma.project.findUnique({
        where: {
          slug,
        },
      });

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      if (project.userId !== session.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      await prisma.project.delete({
        where: {
          slug,
        },
      });

      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ message: "Couldn't delete project" });
    }
  }
};

export default handler;
