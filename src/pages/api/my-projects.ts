import { NextApiHandler } from "next";

import { getServerAuthSession } from "~/utils/server/auth";
import { prisma } from "~/utils/server/db";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        user: {
          id: session.user.id,
        },
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
