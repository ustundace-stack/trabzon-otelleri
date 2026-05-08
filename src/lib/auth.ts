// JWT kimlik doğrulama yardımcıları — jose kütüphanesi kullanılır (Edge uyumlu)
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Oturum token cookie adı
const COOKIE_NAME = 'trabzon-admin-session';

// JWT payload tipi
interface AdminPayload {
  userId: number;
  email: string;
  role: string;
}

// Gizli anahtarı Uint8Array formatına dönüştür
function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET ortam değişkeni tanımlanmamış');
  return new TextEncoder().encode(secret);
}

// Yeni JWT token oluştur (24 saat geçerli)
export async function signToken(payload: AdminPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecretKey());
}

// Token'ı doğrula ve payload'ı döndür
export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}

// Mevcut oturum cookie'sinden kullanıcı bilgisini oku
export async function getSessionUser(): Promise<AdminPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

// Cookie bilgileri — dışa açık sabitler
export const SESSION_COOKIE = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24, // 24 saat
  },
};
