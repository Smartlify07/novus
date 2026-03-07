'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

const PUBLIC_ROUTES = ['/login', '/signup', '/'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      const isAuth = checkAuth();
      const isPublicRoute = PUBLIC_ROUTES.some((route) => 
        pathname === route || pathname?.startsWith(route)
      );

      if (!isAuth && !isPublicRoute) {
        router.push('/login');
      } else if (isAuth && (pathname === '/login' || pathname === '/signup')) {
        router.push('/dashboard');
      }
      
      setIsLoading(false);
    };

    checkAuthentication();
  }, [pathname, isAuthenticated, router, checkAuth]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
