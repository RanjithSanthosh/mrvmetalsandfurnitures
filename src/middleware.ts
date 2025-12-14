
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// We use 'jose' because 'jsonwebtoken' is not edge-compatible, 
// and middleware runs on edge/Node. Next.js middleware works best with `jose` or just standard web crypto.
// But earlier I installed `jsonwebtoken`. 
// However, in Next.js Middleware (Edge Runtime), `jsonwebtoken` usually works if specifically configured or we use `jose`.
// I'll stick to `jose` which is built-in friendly for edge. 
// Wait, I didn't install `jose`. I installed `jsonwebtoken`.
// Middleware in Next.js defaults to Edge Runtime where `jsonwebtoken` might fail due to `crypto` Node module dependency.
// I will rewrite this to use nothing but simple cookie check for now, 
// OR I will simply use `jsonwebtoken` but force middleware to run on Node? No, middleware is edge.
// Better plan: I'll use `jose`. It is lightweight standard for Next.js middleware.
// I will execute `npm install jose` quickly.

export const config = {
  matcher: ['/admin/:path*'],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public admin pages (login)
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check for token
  const token = req.cookies.get('admin_token')?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret');
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }
}
