import { NextApiHandler } from "next";

import { getServerAuthSession } from "~/utils/server/auth";
import { prisma } from "~/utils/server/db";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerAuthSession({ req, res });
  const { id } = req.query as { id: string };

  if (req.method !== "DELETE" && req.method !== "PATCH" && req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (req.method === "GET") {
    try {
      const comment = await prisma.comment.findUnique({
        where: {
          id,
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

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      return res.status(200).json(comment);
    } catch (err) {
      return res.status(500).json({ message: "Couldn't get comment" });
    }
  }

  if (req.method === "PATCH") {
    if (!session) {
      return res.status(401).json({ message: "You must be logged in" });
    }

    try {
      const comment = await prisma.comment.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (comment.userId !== session.user.id) {
        return res.status(403).json({ message: "You can't edit this comment" });
      }

      const body = req.body;

      const updatedComment = await prisma.comment.update({
        where: {
          id,
        },
        data: {
          content: body.content,
        },
      });

      return res.status(200).json(updatedComment);
    } catch (err) {
      return res.status(500).json({ message: "Couldn't update comment" });
    }
  }

  if (req.method === "DELETE") {
    if (!session) {
      return res.status(401).json({ message: "You must be logged in" });
    }

    try {
      const comment = await prisma.comment.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (comment.userId !== session.user.id) {
        return res.status(403).json({ message: "You can't delete this comment" });
      }

      await prisma.comment.delete({
        where: {
          id,
        },
      });

      return res.status(200).json({ message: "Comment deleted" });
    } catch (err) {
      return res.status(500).json({ message: "Couldn't delete comment" });
    }
  }
};

export default handler;
