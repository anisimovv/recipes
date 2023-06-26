import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCreateRecipe } from '@/hooks/useCreateRecipe';
import { useDeleteRecipe } from '@/hooks/useDeleteRecipe';
import { useRecipes } from '@/hooks/useRecipes';
import Link from 'next/link';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useUpdateRecipe } from '@/hooks/useUpdateRecipe';

export default function RecipesPage() {
  const { data, isLoading } = useRecipes();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const { mutate: deleteMutate } = useDeleteRecipe();
  const { mutate: createMutate } = useCreateRecipe();
  const { mutate: updateMutate } = useUpdateRecipe();

  const handleUpdate = (
    e: React.FormEvent<HTMLFormElement>,
    recipeId: string
  ) => {
    e.preventDefault();
    updateMutate({ recipeId, newName, newDescription });
    setNewName('');
    setNewDescription('');
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutate({ name: name, description: description });
    setName('');
    setDescription('');
  };

  const handleDelete = (recipeId: string) => {
    deleteMutate(recipeId);
  };

  if (isLoading || !data) {
    return <div>{isLoading}</div>;
  }

  return (
    <div className="p-1">
      <Table className="rounded-md bg-slate-300">
        <TableCaption>
          <Dialog>
            <DialogTrigger>
              <Button>Add new recipe</Button>
            </DialogTrigger>
            <DialogContent>
              <form action="#" onSubmit={(e) => handleCreate(e)}>
                <DialogHeader>
                  <DialogTitle>Create recipe here!</DialogTitle>
                  <DialogDescription>Write name for recipe</DialogDescription>
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <DialogDescription>
                    Write description about recipe
                  </DialogDescription>
                  <Input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </DialogHeader>
                <div className="flex justify-center">
                  <DialogTrigger>
                    <Button className="mt-5" type="submit">
                      Create new recipe
                    </Button>
                  </DialogTrigger>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </TableCaption>
        <TableHeader>
          <TableRow className="border-sky-700">
            <TableHead className="text-lg font-extrabold text-black">
              Recipe name
            </TableHead>
            <TableHead className="text-lg font-extrabold text-black">
              Recipe
            </TableHead>
            <TableHead className="text-lg font-extrabold text-black">
              Link
            </TableHead>
            <TableHead className="text-center text-lg font-extrabold text-black">
              Edit
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((recip) => (
            <TableRow key={recip.id}>
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
                <Button
                  className="w-[100px]"
                  onClick={() => handleDelete(recip.id)}
                >
                  Delete
                </Button>
                <Dialog>
                  <DialogTrigger>
                    <Button className="w-[100px]">Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form action="#" onSubmit={(e) => handleUpdate(e, recip.id)}>
                      <DialogHeader>
                        <DialogTitle>Update recip!</DialogTitle>
                        <DialogDescription>
                          Write new name for recipe
                        </DialogDescription>
                        <Input
                          placeholder="Name"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          required
                        />

                        <DialogDescription>
                          Write new description about recipe
                        </DialogDescription>
                        <Input
                          placeholder="Description"
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          required
                        />
                      </DialogHeader>
                      <div className="flex justify-center">
                        <DialogTrigger>
                          <Button className="mt-5" type="submit">
                            Update recipe
                          </Button>
                        </DialogTrigger>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
