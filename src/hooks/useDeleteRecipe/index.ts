import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { Recipe } from '@prisma/client';

const deleteRecipe = async (recipeId: string): Promise<void> => {
  await axios.delete(`/api/recipe/${recipeId}`);
};

const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: deleteRecipe,
    onMutate: async (recipeId: string) => {
      await queryClient.cancelQueries(['recipes']);

      const previousRecipes = queryClient.getQueryData<Recipe[] | undefined>(['recipes']);

      queryClient.setQueryData<Recipe[] | undefined>(['recipes'], (oldRecipes) =>
        oldRecipes?.filter((recipe) => recipe.id !== recipeId)
      );

      return { previousRecipes };
    },
    onError: (err: unknown, recipeId: string, context: { previousRecipes?: Recipe[] }) => {
      queryClient.setQueryData<Recipe[] | undefined>(['recipes'], context?.previousRecipes);
    },
    onSettled: async () => {
        await queryClient.invalidateQueries(['recipes']);
    },
  });
};

export {useDeleteRecipe};
