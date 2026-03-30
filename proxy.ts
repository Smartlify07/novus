import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './app/features/auth/api';

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const expiresAt = cookieStore.get('token_expires_at');

  const isAuthenticated =
    token?.value && Number(expiresAt?.value) >= Date.now() / 1000;
  const { pathname } = request.nextUrl;
  const PUBLIC_ROUTES = ['/login', '/signup', '/'];
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route);

  if (!isAuthenticated && !isPublicRoute) {
    // Redirect unauthenticated users away from protected routes
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
