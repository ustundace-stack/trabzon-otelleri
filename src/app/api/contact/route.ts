// İletişim formu API route — Infrastructure (API katmanı)
// Gerçek senaryoda e-posta veya CRM entegrasyonu buraya eklenecektir.

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, email, message } = body;

    // Gelen veriyi doğrula
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'Ad, e-posta ve mesaj alanları zorunludur.' },
        { status: 400 }
      );
    }

    // Burada e-posta gönderme servisi (Resend, SendGrid vb.) veya CRM entegrasyonu yapılabilir
    // Şimdilik başarılı yanıt döndürüyoruz

    return NextResponse.json(
      { success: true, message: 'Mesajınız başarıyla alındı. En kısa sürede size dönüş yapacağız.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
}
