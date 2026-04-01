import { decodeJwt } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE_NAMES = ['token', 'token_expires_at', 'session'] as const;
const PUBLIC_ROUTES = new Set(['/', '/login', '/signup']);

const clearAuthCookies = (response: NextResponse) => {
  for (const cookieName of AUTH_COOKIE_NAMES) {
    response.cookies.delete(cookieName);
  }

  return response;
};

const parseExpiry = (value?: string) => {
  if (!value) {
    return null;
  }

  const timestamp = Number(value);
  return Number.isFinite(timestamp) ? timestamp : null;
};

const getTokenExpiry = (token: string, fallbackExpiry?: string) => {
  const fallbackExpiresAt = parseExpiry(fallbackExpiry);

  try {
    const { exp } = decodeJwt(token);
    if (typeof exp === 'number') {
      return exp * 1000;
    }
  } catch {
    return null;
  }

  return fallbackExpiresAt;
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = PUBLIC_ROUTES.has(pathname);
  const token = request.cookies.get('token')?.value;
  const expiresAt = request.cookies.get('token_expires_at')?.value;
  const tokenExpiry = token ? getTokenExpiry(token, expiresAt) : null;
  const isAuthenticated =
    typeof tokenExpiry === 'number' && tokenExpiry >= Date.now();

  if (!isAuthenticated && !isPublicRoute) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    return clearAuthCookies(response);
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (token && !isAuthenticated) {
    return clearAuthCookies(NextResponse.next());
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/create-account',
    '/dashboard/:path*',
    '/loans/:path*',
    '/transactions/:path*',
    '/transfer/:path*',
  ],
};
