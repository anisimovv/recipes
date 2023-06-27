import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useUpdateRecipe } from '@/hooks/useUpdateRecipe';

interface Props {
  openTrigger: string;
  closeTrigger: string;
  title: string;
  recipeId: string;
}

const DialogUpdate: React.FC<Props> = ({
  openTrigger,
  closeTrigger,
  title,
  recipeId,
}: Props) => {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const { mutate: updateMutate } = useUpdateRecipe();

  const handleUpdate = (
    e: React.FormEvent<HTMLFormElement>,
    recipeId: string | undefined
  ) => {
    e.preventDefault();
    const id = recipeId || '';
    updateMutate({ recipeId: id, newName, newDescription });
    setNewName('');
    setNewDescription('');
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="w-[100px]">{openTrigger}</Button>
        </DialogTrigger>
        <DialogContent>
          <form action="#" onSubmit={(e) => handleUpdate(e, recipeId)}>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>Write name for recipe</DialogDescription>
              <Input
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />

              <DialogDescription>
                Write description about recipe
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
                  {closeTrigger}
                </Button>
              </DialogTrigger>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogUpdate;
