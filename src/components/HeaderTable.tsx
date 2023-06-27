import React from 'react';
import { TableHead, TableHeader, TableRow } from './ui/table';

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
        <TableHead className="text-center text-lg font-extrabold text-black">
          Edit
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default HeaderTable;
