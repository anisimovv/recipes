import React from 'react';
import { TableHead, TableHeader, TableRow } from './ui/table';
import DialogCreate from './DialogCreate';

const HeaderTable = () => {
  return (
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
        <TableHead className="text-center text-lg w-[200px] font-extrabold text-black">
          Edit
        </TableHead>
        <TableHead className="text-center text-lg font-extrabold w-[200px] text-black">
          <DialogCreate
            title="Create recipe here"
            openTrigger="Add new recipe"
            closeTrigger="Create recipe"
          />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default HeaderTable;
