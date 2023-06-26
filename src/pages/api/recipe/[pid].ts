import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface ReqBody {
  name: string;
  description: string;
}


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
  }

  if (req.method === 'PATCH') {
    const { pid } = req.query;

    try {
      const id = Array.isArray(pid) ? pid[0] : pid;
      const requestBody: ReqBody = req.body as ReqBody;

      const response = await prisma.recipe.update({
        where: {
          id: id,
        },
        data: requestBody,
      });

      res.send(response);
    } catch (error) {
      console.error('Error update recipe:', error);
      res.status(500).json({ error: 'Failed to update recipe' });
    }
  }
}
