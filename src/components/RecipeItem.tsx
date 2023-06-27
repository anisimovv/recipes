import React from 'react';
import { TableCell } from './ui/table';
import { Button } from './ui/button';
import DialogUpdate from './DialogUpdate';
import type { Recipe } from '@prisma/client';
import Link from 'next/link';``
import { useDeleteRecipe } from '@/hooks/useDeleteRecipe';

interface Props {
  recip: Recipe;
}

const RecipeItem: React.FC<Props> = ({ recip}:Props) => {
  const { mutate: deleteMutate } = useDeleteRecipe();

  const handleDelete = (recipeId: string) => {
    deleteMutate(recipeId);
  };
  return (
    <>
      <TableCell className="font-medium">{recip.name}</TableCell>
      <TableCell className="max-w-xs overflow-hidden text-ellipsis font-medium">
        {recip.description}
      </TableCell>
      <TableCell className="font-medium">
        <Link
          className="text-dec font-extrabold text-blue-500"
          href={`/recipes/${recip.id}`}
        >
          Read more
        </Link>
      </TableCell>
      <TableCell className="flex justify-center gap-2 font-medium">
        <Button className="w-[100px]" onClick={() => handleDelete(recip.id)}>
          Delete
        </Button>
        <DialogUpdate
          title="Update recipe here!"
          openTrigger="Edit"
          closeTrigger="UpdateRecipe"
          recipeId={recip.id}
        />
      </TableCell>
    </>
  );
};

export default RecipeItem;
