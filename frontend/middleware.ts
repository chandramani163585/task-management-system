import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Basic naive middleware to redirect if not authenticated (checked via cookies in real app)
  // Since we're using local storage for tokens, this is hard to do perfectly in edge middleware without cookies.
  // The client side layout guard already handles it mostly. But we can stub this for future.
  
  // If we had a token cookie:
  // const token = request.cookies.get('token');
  // if (!token && !request.nextUrl.pathname.startsWith('/login')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
