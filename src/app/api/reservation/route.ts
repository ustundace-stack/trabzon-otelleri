import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Zod veya benzeri bir validasyon kütüphanesi ile veriler doğrulanabilir
    const { name, phone, checkin, checkout, adults, hotelSlug } = body;

    if (!name || !phone || !checkin || !checkout) {
      return NextResponse.json(
        { error: "Lütfen zorunlu tüm alanları doldurun." },
        { status: 400 }
      );
    }

    // Mock Database Kayıt İşlemi
    // await db.reservation.create({ data: { ... } })

    console.log("Yeni Rezervasyon Talebi Alındı:", {
      hotelSlug,
      name,
      phone,
      dates: `${checkin} - ${checkout}`,
      guests: `${adults} Yetişkin`
    });

    return NextResponse.json(
      { success: true, message: "Rezervasyon talebiniz başarıyla alındı. Tesisimiz en kısa sürede sizinle iletişime geçecektir." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Rezervasyon Hatası:", error);
    return NextResponse.json(
      { error: "İşlem sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
