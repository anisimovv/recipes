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
import { useRecipes } from '@/hooks/useRecipes';
import Link from 'next/link';

export default function RecipesPage() {
  const { data, isLoading } = useRecipes();

  if (isLoading || !data) {
    return <div>{isLoading}</div>;
  }

  return (
    <Table className="bg-slate-300">
      <TableCaption>My table</TableCaption>
      <TableHeader>
        <TableRow className="border-sky-700">
          <TableHead className="text-black font-extrabold text-lg">Recipe name</TableHead>
          <TableHead className="text-black font-extrabold text-lg">Recipe</TableHead>
          <TableHead className="text-black font-extrabold text-lg">Link</TableHead>
          <TableHead className="text-black font-extrabold text-lg">Edit</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((recip) => (
          <TableRow key={recip.id}>
            <TableCell className="font-medium">{recip.name}</TableCell>
            <TableCell className="font-medium">{recip.description}</TableCell>
            <TableCell className="font-medium">
              <Link href={`/recipes/${recip.id}`}>SomeLink</Link>
            </TableCell>
            <TableCell className="font-medium flex gap-2">
              <Button>Delete</Button>
              <Button>Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
