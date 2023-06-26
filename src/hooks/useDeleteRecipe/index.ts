import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { Recipe } from '@prisma/client';

const deleteRecipe = async (recipeId: string) => {
  await axios.delete(`/api/recipe/${recipeId}`);
};

const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: deleteRecipe,
      onMutate: async (recipeId) => {
          await queryClient.cancelQueries({ queryKey: ["recipes"] });

          const previousRecipes = queryClient.getQueryData(["recipes"]);

          queryClient.setQueryData<Recipe[]>(["recipes"], (old) =>
              (old ?? []).filter((recipe) => recipe.id !== recipeId)
          );

          return { previousRecipes };
      },
      onError: (err, recipeId, context) => {
          queryClient.setQueryData(["recipes"], context?.previousRecipes);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: ["recipes"] });
      },
  });
};

export { useDeleteRecipe }
