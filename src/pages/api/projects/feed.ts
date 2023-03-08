import type { NextApiHandler } from "next";

import { prisma } from "~/utils/server/db";

const handler: NextApiHandler = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  const { cursor, tag, query } = req.query as { cursor?: string; tag?: string; query?: string };

  try {
    const projects = await prisma.project.findMany({
      where: {
        title: {
          contains: query,
        },
        tags: {
          some: {
            name: tag,
          },
        },
      },
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
      orderBy: {
        createdAt: "desc",
      },
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    let nextCursor: string | undefined = undefined;

    if (projects.length > limit) {
      const nextItem = projects.pop() as (typeof projects)[number];

      nextCursor = nextItem.id;
    }

    res.status(200).json({
      projects,
      nextCursor,
    });
  } catch (err) {
    res.status(500).json({ message: "Couldn't load feed" });
  }
};

export default handler;
