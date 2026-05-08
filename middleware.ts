// Admin rotalarını koruyan Next.js Middleware
// /admin/* altındaki tüm isteklerde oturum doğrulaması yapar
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Gizli anahtarı Uint8Array'e çevir (middleware edge ortamında çalışır)
function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET ?? 'trabzon-otelleri-super-secret-jwt-key-2024';
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Yalnızca /admin altındaki rotalar korunur; login sayfası hariç
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('trabzon-admin-session')?.value;

    if (!token) {
      // Token yoksa login sayfasına yönlendir
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Token geçerliliğini doğrula
      await jwtVerify(token, getSecretKey());
      return NextResponse.next();
    } catch {
      // Geçersiz veya süresi dolmuş token — login'e yönlendir
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      const response = NextResponse.redirect(loginUrl);
      // Geçersiz cookie'yi temizle
      response.cookies.delete('trabzon-admin-session');
      return response;
    }
  }

  return NextResponse.next();
}

// Middleware'in hangi rotalarda çalışacağını belirle
export const config = {
  matcher: ['/admin/:path*'],
};
