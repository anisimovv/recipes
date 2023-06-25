import type { Recipe } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AxiosResponse } from "axios";

const fetchOne = async (recipeId: string) => {
  const response: AxiosResponse<Recipe> = await axios.get(`/api/recipes/${recipeId}`);
  return response.data;
};

const useRecipe = (recipeId: string) => {
    return useQuery(["recipe", recipeId], () => fetchOne(recipeId));
}

export { useRecipe}