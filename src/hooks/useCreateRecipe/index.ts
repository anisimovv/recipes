import type { Recipe } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface NewRecipe {
  name: string;
  description: string;
}

const createRecipe = async (newRec: NewRecipe) => {
  const response = await axios.post('/api/recipe', newRec);

  return response;
};

const useCreateRecipe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRecipe,
        onMutate: async (newRecipe) => {
            await queryClient.cancelQueries({ queryKey: ["recipes"] });

            const previousRecipes = queryClient.getQueryData(["recipes"]);

            queryClient.setQueryData<Recipe[]>(["recipes"], (old: Recipe[] | undefined) => [...(old ?? []), newRecipe as Recipe]);

            return { previousRecipes };
        },
        onError: (err, newTodo, context) => {
            queryClient.setQueryData(["recipes"], context?.previousRecipes);
        },
        onSettled: async () => {
          await  queryClient.invalidateQueries({ queryKey: ["recipes"] });
        },
    });
};

export { useCreateRecipe }
