import { useRecipe } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SingleRecipePage() {
  const { query } = useRouter();
  const receipeId = (query?.id as string) || '';

  const { data, isLoading } = useRecipe(receipeId);

  if (isLoading || !data) {
    return <div>{isLoading}</div>;
  }

  return (
    <div className='p-4'>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-lg">Recipe: {data.name}</CardTitle>
        </CardHeader>
        <CardContent className='max-w-xs'>
          <p className='max-w-xs break-all'>{data.description}</p>
        </CardContent>
        <CardFooter>
          {data.createdAt && (
            <p>Was added {data.createdAt.toString()}</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
