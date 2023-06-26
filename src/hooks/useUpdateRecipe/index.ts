import type { Recipe } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface MutateArgs {
  recipeId: string;
  newName: string;
  newDescription: string;
}

const updateRecipe = async ({
  recipeId,
  newName,
  newDescription
}: MutateArgs ) => {
  const response = await axios.patch(`/api/recipe/${recipeId}`, {
    name: newName,
    description: newDescription,
  });
  const data = response.data as Recipe

  return data;
};

const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRecipe,
    onMutate: async ({ recipeId, newName, newDescription }: MutateArgs) => {
      await queryClient.cancelQueries(['recipes']);

      const previousRecipes = queryClient.getQueryData(['recipes']);

      queryClient.setQueryData<Recipe[]>(['recipes'], (old) =>
        (old ?? []).map((recipe: Recipe) =>
          recipe.id === recipeId
            ? {
                ...recipe,
                name: newName,
                description: newDescription,
              }
            : recipe
        )
      );

      return { previousRecipes };
    },
    onError: (_err, _newRecipe, context) => {
      queryClient.setQueryData(['recipes'], context?.previousRecipes);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['recipes']);
    },
  });
};

export { useUpdateRecipe };
