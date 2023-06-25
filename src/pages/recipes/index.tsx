import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function RecipesPage() {
  return (
    // <Table>
    //   <TableCaption>A list of your recent invoices.</TableCaption>
    //   <TableHeader>
    //     <TableRow className="bg-slate-600">
    //       <TableHead className="w-[100px] text-white">Invoice</TableHead>
    //       <TableHead className="text-white">Status</TableHead>
    //       <TableHead className="text-white">Method</TableHead>
    //       <TableHead className="text-right">Edit</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     <TableRow>
    //       <TableCell className="font-medium">INV001</TableCell>
    //       <TableCell>Paid</TableCell>
    //       <TableCell>Credit Card</TableCell>
    //       <TableCell className="text-right">
    //         <button>dasda</button>
    //       </TableCell>
    //     </TableRow>
    //   </TableBody>
    // </Table>

    <Table className="bg-slate-300">
      <TableCaption>My table</TableCaption>
      <TableHeader>
        <TableRow className="border-sky-700">
          <TableHead>Recipe name</TableHead>
          <TableHead>Recipe</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Edit</TableHead>
        </TableRow>
      </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="font-medium">111</TableCell>
            <TableCell className="font-medium">228</TableCell>
            <TableCell className="font-medium">228</TableCell>
            <TableCell className="font-medium">228</TableCell>
          </TableRow>
        </TableBody>
    </Table>
  );
}
