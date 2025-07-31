import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that guests can access
const publicRoutes = ['/home', '/pricing', '/signup', '/login'];

// Define protected routes that require authentication
const protectedRoutes = ['/diet', '/chat', '/dashboard', '/setup-child', '/profile'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
  
  // For now, we'll use a simple approach - in production you'd check for auth tokens
// This is a placeholder for actual authentication logic
// Since we're using mock authentication, we'll allow access to protected routes
// In a real app, you'd check for valid auth tokens here
const isAuthenticated = request.cookies.has('auth-token') || 
                       request.headers.get('authorization')?.startsWith('Bearer ') ||
                       true; // Temporarily allow all access for development
  
  // If it's a protected route and user is not authenticated, redirect to signup
if (isProtectedRoute && !isAuthenticated) {
  const signupUrl = new URL('/signup', request.url);
  signupUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(signupUrl);
}

// If user is authenticated and trying to access signup/login, redirect to setup-child
// The setup-child page will handle checking if profile exists and redirect accordingly
if (isAuthenticated && (pathname === '/signup' || pathname === '/login')) {
  return NextResponse.redirect(new URL('/setup-child', request.url));
}

// Allow access to setup-child for authenticated users
if (isAuthenticated && pathname === '/setup-child') {
  return NextResponse.next();
}
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 