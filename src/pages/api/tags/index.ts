import type { NextApiHandler } from "next";

import { prisma } from "~/utils/server/db";

const handler: NextApiHandler = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany();

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: "Couldn't load tags" });
  }
};

export default handler;
