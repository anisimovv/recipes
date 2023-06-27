import React, {useState } from 'react';
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
import { useCreateRecipe } from '@/hooks/useCreateRecipe';

interface Props {
  openTrigger: string;
  closeTrigger: string;
  title: string;
}

const DialogCreate: React.FC<Props> = ({
  openTrigger,
  closeTrigger,
  title,

}: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { mutate: createMutate } = useCreateRecipe();

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutate({ name: name, description: description });
    setName('');
    setDescription('');
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>{openTrigger}</Button>
        </DialogTrigger>
        <DialogContent>
          <form action="#" onSubmit={(e) => handleCreate(e)}>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
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

export default DialogCreate;
