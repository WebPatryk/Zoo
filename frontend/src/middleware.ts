import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'services/jwt_sign_verify';

const secret = process.env.SECRET;

export default async function middleware(req: NextRequest) {
  const jwt = req.cookies.get('OutsiteJWT')?.value;
  const url = req.url;
  const { pathname } = req.nextUrl;

  const PUBLIC_FILE = /\.(.*)$/;

  if (
    pathname.startsWith('/_next') || // exclude Next.js internals
    pathname.startsWith('/api') || //  exclude all API routes
    pathname.startsWith('/static') || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  )
    return NextResponse.next();

  if (pathname.startsWith('/')) {
    if (jwt === undefined) {
      req.nextUrl.pathname = '/login';
      return NextResponse.redirect(req.nextUrl);
    }

    try {
      await verify(jwt, secret);
      return NextResponse.next();
    } catch (error) {
      console.log(error);
      req.nextUrl.pathname = '/login';
      return NextResponse.redirect(req.nextUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/'
};
