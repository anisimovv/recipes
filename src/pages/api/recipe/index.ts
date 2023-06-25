import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function recipeHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const { pid } = req.query;
      const id = Array.isArray(pid) ? pid[0] : pid;

      const response = await prisma.recipe.delete({
        where: {
          id: id,
        },
      });

      res.send(response);
    } catch (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ error: 'Failed to delete recipe' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
