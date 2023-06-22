import type { NextApiHandler } from "next";

import { getSlug } from "~/utils/helpers/getSlug";
import { CreateProjectInput } from "~/utils/schemas/project.schema";
import { getServerAuthSession } from "~/utils/server/auth";
import { prisma } from "~/utils/server/db";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerAuthSession({ req, res });

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (req.method === "POST") {
    if (!session) {
      return res.status(401).json({ message: "You must be logged in" });
    }

    try {
      const body = req.body as CreateProjectInput;

      const tagsIds = body.tags.map((tag) => tag.id);

      const tags = await prisma.tag.findMany({
        where: {
          id: {
            in: tagsIds,
          },
        },
      });

      const project = await prisma.project.create({
        data: {
          title: body.title,
          slug: getSlug(body.title),
          description: body.description,
          content: body.content,
          tags: {
            connect: tags.map((tag) => ({ id: tag.id })),
          },
          user: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });

      return res.status(201).json(project);
    } catch (err) {
      return res.status(500).json({ message: "Couldn't create project" });
    }
  }
};

export default handler;
