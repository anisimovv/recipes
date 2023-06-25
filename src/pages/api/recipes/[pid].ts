import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

async function getOne(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { pid } = req.query;

    const id = Array.isArray(pid) ? pid[0] : pid;

    const response = await prisma.recipe.findUnique({
      where: {
        id: id,
      },
    });

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default getOne;