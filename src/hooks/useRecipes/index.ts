import type { Recipe } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface ResponseRecipe {
    response: Recipe[];
    count: number;
}

const fetchAll = async (currentPage: number, perPage: number): Promise<ResponseRecipe> => {
  const response = await axios.get(
    `/api/recipes?page=${currentPage}&per_page=${perPage}`
  );
  return response.data as ResponseRecipe;
};

const useRecipes = ({currentPage = 1, perPage = 10}) => {
  return useQuery(['recipes', currentPage, perPage], () => fetchAll(currentPage, perPage));
};

export { useRecipes };
