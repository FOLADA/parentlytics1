import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that guests can access
const publicRoutes = ['/home', '/pricing', '/signup', '/login'];

// Define protected routes that require authentication
const protectedRoutes = ['/diet', '/chat', '/setup-child', '/profile', '/ai'];

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
  
  // Check authentication from cookies or headers
  const authToken = request.cookies.get('sb-access-token')?.value || 
                   request.headers.get('authorization')?.replace('Bearer ', '');
  
  // For development, allow access if we have environment variables set
  const hasSupabaseConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                           process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // If it's a protected route and user is not authenticated, redirect to signup
  if (isProtectedRoute && !authToken && hasSupabaseConfig) {
    const signupUrl = new URL('/signup', request.url);
    signupUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signupUrl);
  }
  
  // If user is authenticated and trying to access signup/login, redirect to setup-child
  if (authToken && (pathname === '/signup' || pathname === '/login')) {
    return NextResponse.redirect(new URL('/setup-child', request.url));
  }
  
  // Allow access to setup-child for authenticated users
  if (authToken && pathname === '/setup-child') {
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