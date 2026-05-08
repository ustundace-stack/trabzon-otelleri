"use server";

// Rezervasyon server action'ları — zod ile doğrulanmış, hata güvenli
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Rezervasyon form doğrulama şeması
const ReservationSchema = z
  .object({
    name: z
      .string()
      .min(3, "Ad Soyad en az 3 karakter olmalıdır.")
      .max(100, "Ad Soyad 100 karakteri geçemez."),
    email: z.string().email("Geçerli bir e-posta adresi girin."),
    phone: z
      .string()
      .regex(/^[0-9\s\+\-\(\)]{10,15}$/, "Geçerli bir telefon numarası girin."),
    checkIn: z.string().min(1, "Giriş tarihi zorunludur."),
    checkOut: z.string().min(1, "Çıkış tarihi zorunludur."),
    adults: z.coerce.number().int().min(1, "En az 1 yetişkin gereklidir.").max(20),
    children: z.coerce.number().int().min(0).max(20),
    note: z.string().max(500, "Not 500 karakteri geçemez.").optional(),
  })
  .superRefine((data, ctx) => {
    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Giriş tarihi bugünden önce olamaz
    if (checkIn < today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Giriş tarihi geçmiş bir tarih olamaz.",
        path: ["checkIn"],
      });
    }

    // Çıkış tarihi giriş tarihinden sonra olmalı
    if (checkOut <= checkIn) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Çıkış tarihi giriş tarihinden sonra olmalıdır.",
        path: ["checkOut"],
      });
    }
  });

export async function createReservation(
  formData: FormData,
  hotelId: number,
  pricePerNight: number
): Promise<{ success: boolean; message: string; errors?: Record<string, string> }> {
  // FormData'yı nesneye dönüştür ve doğrula
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    checkIn: formData.get("checkIn"),
    checkOut: formData.get("checkOut"),
    adults: formData.get("adults"),
    children: formData.get("children"),
    note: formData.get("note"),
  };

  const validation = ReservationSchema.safeParse(rawData);

  if (!validation.success) {
    // Alan bazlı hata mesajlarını döndür
    const errors: Record<string, string> = {};
    validation.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    });
    return {
      success: false,
      message: "Lütfen form alanlarını kontrol edin.",
      errors,
    };
  }

  const { name, email, phone, checkIn: checkInStr, checkOut: checkOutStr, adults, children, note } =
    validation.data;

  const checkIn = new Date(checkInStr);
  const checkOut = new Date(checkOutStr);

  // Gece sayısını hesapla
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  const nights = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
  const totalAmount = nights * pricePerNight;

  // Çakışan rezervasyon numarası oluşturmamak için timestamp kullan
  const reservationNo = `RES-${Date.now().toString().slice(-6)}`;

  try {
    await prisma.reservation.create({
      data: {
        reservationNo,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        checkIn,
        checkOut,
        adults,
        children,
        note: note ?? null,
        totalAmount,
        status: "pending",
        hotelId,
      },
    });

    return {
      success: true,
      message: "Rezervasyon talebiniz başarıyla alındı! En kısa sürede sizinle iletişime geçeceğiz.",
    };
  } catch {
    return {
      success: false,
      message: "İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.",
    };
  }
}
