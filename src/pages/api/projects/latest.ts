import { NextApiHandler } from "next";

import { prisma } from "~/utils/server/db";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const projects = await prisma.project.findMany({
      take: 5,
      include: {
        tags: true,
        likes: true,
        comments: true,
        bookmarks: true,
        _count: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json({ message: "Couldn't load projects" });
  }
};

export default handler;
