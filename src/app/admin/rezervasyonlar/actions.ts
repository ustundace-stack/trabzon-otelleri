"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateReservationStatus(id: number, status: "pending" | "approved" | "rejected") {
  try {
    await prisma.reservation.update({
      where: { id },
      data: { status },
    });
    
    // Admin sayfasındaki verileri güncelle
    revalidatePath("/admin/rezervasyonlar");
    return { success: true };
  } catch {
    return { success: false, message: "İşlem sırasında bir hata oluştu." };
  }
}
