import { NextApiHandler } from "next";

import { getServerAuthSession } from "~/utils/server/auth";
import { prisma } from "~/utils/server/db";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerAuthSession({ req, res });
  const { slug } = req.query as { slug: string };

  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (req.method === "GET") {
    try {
      const comments = await prisma.comment.findMany({
        where: {
          project: {
            slug,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });

      return res.status(200).json(comments);
    } catch (err) {
      return res.status(500).json({ message: "Couldn't get comments" });
    }
  }

  if (req.method === "POST") {
    if (!session) {
      return res.status(401).json({ message: "You must be logged in" });
    }

    try {
      const body = req.body;

      const comment = await prisma.comment.create({
        data: {
          content: body.content,
          user: {
            connect: {
              id: session.user.id,
            },
          },
          project: {
            connect: {
              slug,
            },
          },
        },
      });

      return res.status(200).json(comment);
    } catch (err) {
      return res.status(500).json({ message: "Couldn't create comment" });
    }
  }
};

export default handler;
