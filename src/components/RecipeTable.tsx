import {
  Table,
  TableBody,
  TableCaption,
  TableRow,
} from '@/components/ui/table';
import { useRecipes } from '@/hooks/useRecipes';
import React from 'react';
import DialogCreate from './DialogCreate';
import RecipeItem from './RecipeItem';
import HeaderTable from './HeaderTable';

export default function RecipeTable() {
  const { data, isLoading } = useRecipes();

  if (isLoading || !data) {
    return <div>{isLoading}</div>;
  }

  return (
    <Table className="rounded-md bg-slate-300">
      <TableCaption>
        <DialogCreate
          title="Create recipe here"
          openTrigger="Add new recipe"
          closeTrigger="Create recipe"
        />
      </TableCaption>
      <HeaderTable />

      <TableBody>
        {data.map((recip) => (
          <TableRow key={recip.id}>
            <RecipeItem recip={recip} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
