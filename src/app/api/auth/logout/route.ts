// Yönetici çıkış API endpoint'i
// Session cookie'sini silerek oturumu sonlandırır
import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/auth';

export async function POST() {
  // Session cookie'sini temizle ve ana sayfaya yönlendir
  const response = NextResponse.redirect(
    new URL('/admin/login', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')
  );
  response.cookies.delete(SESSION_COOKIE.name);
  return response;
}
