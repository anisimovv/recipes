import {
  Table,
  TableBody,
  TableCaption,
  TableRow,
} from '@/components/ui/table';
import { useRecipes } from '@/hooks/useRecipes';
import React, { useState } from 'react';
import DialogCreate from './DialogCreate';
import RecipeItem from './RecipeItem';
import HeaderTable from './HeaderTable';

export default function RecipeTable() {
  const [page, setPage] = useState(1);
  const perPage = 10; 
  const { data, isLoading } = useRecipes({page, perPage});

  if (isLoading || !data) {
    return <div>{isLoading}</div>;
  }

  return (
    <Table className="rounded-md bg-slate-300">
      <TableCaption>
        <button onClick={()=> setPage((prev) => prev < (data.count / perPage) ? prev + 1 : prev )}>NEXT</button>
        <p>{data.count}</p>        
        <button onClick={()=> setPage((prev) => prev > 1 ? prev - 1 : prev )}>PREV</button>
        <DialogCreate
          title="Create recipe here"
          openTrigger="Add new recipe"
          closeTrigger="Create recipe"
        />
      </TableCaption>
      <HeaderTable />

      <TableBody>
        {data.response.map((recip) => (
          <TableRow key={recip.id}>
            <RecipeItem recip={recip} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
