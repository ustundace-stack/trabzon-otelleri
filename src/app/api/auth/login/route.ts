// Yönetici giriş API endpoint'i
// Kimlik bilgilerini doğrular, başarılıysa JWT cookie'si oluşturur
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { signToken, SESSION_COOKIE } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body as { email: string; password: string };

    // Girdi doğrulaması
    if (!email || !password) {
      return NextResponse.json(
        { message: 'E-posta ve şifre zorunludur.' },
        { status: 400 }
      );
    }

    // Veritabanında admin kullanıcısını ara
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Geçersiz kimlik bilgileri.' },
        { status: 401 }
      );
    }

    // Şifre doğrulama
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Geçersiz kimlik bilgileri.' },
        { status: 401 }
      );
    }

    // JWT token oluştur
    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Başarılı yanıt — httpOnly cookie ile token'ı gönder
    const response = NextResponse.json(
      { message: 'Giriş başarılı.' },
      { status: 200 }
    );
    response.cookies.set(SESSION_COOKIE.name, token, SESSION_COOKIE.options);
    return response;
  } catch {
    return NextResponse.json(
      { message: 'Sunucu hatası oluştu, lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
