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
import PaginationButtons from './PaginationButtons';

export default function RecipeTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10; 
  const { data, isLoading } = useRecipes({currentPage, perPage});

  if (isLoading || !data) {
    return <div>{isLoading}</div>;
  }
  

  return (
    <Table className="rounded-md bg-slate-300">
      <TableCaption>        
        <PaginationButtons 
            currentPage={currentPage}
            totalPages={Math.ceil(data.count / perPage)}
            setCurrentPage={setCurrentPage}
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
