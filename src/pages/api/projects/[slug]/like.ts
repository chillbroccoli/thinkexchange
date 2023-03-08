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
          likes: true,
        },
      });

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const isLiked = project.likes.find((like) => like.userId === session.user.id);

      if (isLiked) {
        const like = await prisma.like.delete({
          where: {
            id: isLiked.id,
          },
        });

        return res.status(200).json(like);
      } else {
        const like = await prisma.like.create({
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

        return res.status(201).json(like);
      }
    } catch (err) {
      return res.status(500).json({ message: "Couldn't like project" });
    }
  }
};

export default handler;
