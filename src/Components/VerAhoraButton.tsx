'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function VerAhoraButton({ slug }: { slug: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/content/${slug}`);
  };

  return (
    <Button onClick={handleClick}>
      Ver ahora
    </Button>
  );
}