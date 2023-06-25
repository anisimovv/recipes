import { useRecipe } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';

export default function SingleRecipePage() {
  const { query } = useRouter();
  const receipeId = (query?.id as string) || '';

  const { data, isLoading} = useRecipe(receipeId);

  if (isLoading || !data) {
    return <div>{isLoading}</div>
  }

  return <div>{`Recipe page - id ${receipeId}`} {data.name}</div>;
}
