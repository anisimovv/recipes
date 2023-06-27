import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import type { Recipe } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAll(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {page = 1, per_page = 10} = req.query;
    const skip = (Number(page) - 1) * Number(per_page);

    const count = await prisma.recipe.count()

    const response: Recipe[] = await prisma.recipe.findMany({
      skip,
      take: Number(per_page),
      orderBy: {
        name: "asc"
      }
    });
    res.send({response, count});
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get recipes' });
  }
}
