import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface ReqBody {
    name: string;
    description: string;
}

interface CreateRecipeData {
    data: ReqBody;
}

const prisma = new PrismaClient();

const createRecipe = async (req: NextApiRequest, res: NextApiResponse) => {
    const requestBody: ReqBody = req.body as ReqBody;
    const data: CreateRecipeData = {
        data: {
            name: requestBody.name,
            description: requestBody.description
        }
    };
   const response = await prisma.recipe.create(data)

   res.send(response)
}

export default createRecipe;