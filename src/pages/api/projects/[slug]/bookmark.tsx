import { NextApiHandler } from "next";

import { getServerAuthSession } from "~/utils/server/auth";
import { prisma } from "~/utils/server/db";

const handler: NextApiHandler = async (req, res) => {
  const { slug } = req.query as { slug: string };
  const session = await getServerAuthSession({ req, res });

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (req.method === "POST") {
    if (!session) {
      return res.status(401).json({ message: "You must be logged in" });
    }

    try {
      const project = await prisma.project.findUnique({
        where: {
          slug,
        },
        include: {
          bookmarks: true,
        },
      });

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const isBookmarked = project.bookmarks.find(
        (bookmark) => bookmark.userId === session.user.id
      );

      if (isBookmarked) {
        const bookmark = await prisma.bookmark.delete({
          where: {
            id: isBookmarked.id,
          },
        });

        return res.status(200).json(bookmark);
      } else {
        const bookmark = await prisma.bookmark.create({
          data: {
            user: {
              connect: {
                id: session.user.id,
              },
            },
            project: {
              connect: {
                id: project.id,
              },
            },
          },
        });

        return res.status(201).json(bookmark);
      }
    } catch (err) {
      return res.status(500).json({ message: "Couldn't bookmark project" });
    }
  }
};

export default handler;
