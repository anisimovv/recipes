import type { Recipe } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface ResponseRecipe {
    response: Recipe[];
    count: number;
}

const fetchAll = async (page: number, perPage: number): Promise<ResponseRecipe> => {
  const response = await axios.get(
    `/api/recipes?page=${page}&per_page=${perPage}`
  );
  return response.data as ResponseRecipe;
};

const useRecipes = ({page = 1, perPage = 10}) => {
  return useQuery(['recipes', page, perPage], () => fetchAll(page, perPage));
};

export { useRecipes };
