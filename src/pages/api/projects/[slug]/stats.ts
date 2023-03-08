import { NextApiHandler } from "next";

import { prisma } from "~/utils/server/db";

const handler: NextApiHandler = async (req, res) => {
  const { slug } = req.query as { slug: string };

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (req.method === "GET") {
    try {
      const project = await prisma.project.findUnique({
        where: {
          slug,
        },
        select: {
          likes: true,
          bookmarks: true,
          _count: {
            select: {
              comments: true,
              likes: true,
              bookmarks: true,
            },
          },
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
};

export default handler;
