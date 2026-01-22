'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="flex  items-center flex-col justify-center min-h-svh">
      <h1 className="text-5xl font-semibold">Banking Built For What's Next</h1>
      <Link href={'/signup'}>
        <Button size={'lg'} className="mt-4">
          Get started
        </Button>
      </Link>
    </main>
  );
}
