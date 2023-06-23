import { useRouter } from 'next/router';

export default function SingleRecipePage() {
  const { query } = useRouter();
  const receipeId = (query?.id as string) || '';

  return <div>{`Recipe page - id ${receipeId}`}</div>;
}
