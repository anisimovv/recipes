import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import type { Recipe } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAll(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response: Recipe[] = await prisma.recipe.findMany();
    res.status(200).json(response);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get recipes' });
  }
}
