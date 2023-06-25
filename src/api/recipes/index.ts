import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import type { Recipe } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAll(req: NextApiRequest, res: NextApiResponse) {
  try {
    const recipes: Recipe[] = await prisma.recipes.findMany();
    res.status(200).json(recipes);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Не удалось получить рецепты' });
  } finally {
    await prisma.$disconnect();
  }
}
