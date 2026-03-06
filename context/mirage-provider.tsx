'use client';
import makeServer from '@/lib/mirage';
import { useEffect } from 'react';

export function MirageProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      makeServer({
        environment: 'development',
      });
    }
  }, []);

  return <>{children}</>;
}
