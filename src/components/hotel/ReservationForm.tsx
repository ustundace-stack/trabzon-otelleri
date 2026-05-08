"use client";

// Rezervasyon formu — zod doğrulamalı server action ile entegre
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createReservation } from "@/core/application/actions/reservation.actions";
import { CheckCircle, AlertCircle } from "lucide-react";

interface Props {
  hotelId: number;
  pricePerNight: number;
}

interface ActionResult {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
}

// Bugünün tarihini YYYY-MM-DD formatında döndürür
function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

export function ReservationForm({ hotelId, pricePerNight }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);
  const today = getTodayString();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const res = await createReservation(formData, hotelId, pricePerNight);

    setResult(res);
    setIsLoading(false);

    if (res.success) {
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-border/50 sticky top-24">
      {/* Fiyat Başlığı */}
      <div className="mb-6 pb-6 border-b border-border/50">
        <span className="text-sm text-muted-foreground font-medium mb-1 block">
          Gecelik Başlangıç
        </span>
        <div className="text-3xl font-bold text-primary">
          ₺{pricePerNight.toLocaleString("tr-TR")}
        </div>
      </div>

      {/* Sonuç Mesajı */}
      {result && (
        <div
          className={`flex items-start gap-3 p-4 mb-6 rounded-lg text-sm border ${
            result.success
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {result.success ? (
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          )}
          <span>{result.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tarih Seçimi */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="checkIn">Giriş Tarihi</Label>
            <Input
              type="date"
              id="checkIn"
              name="checkIn"
              min={today}
              required
              className={`w-full ${result?.errors?.checkIn ? "border-red-400" : ""}`}
            />
            {result?.errors?.checkIn && (
              <p className="text-xs text-red-500">{result.errors.checkIn}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkOut">Çıkış Tarihi</Label>
            <Input
              type="date"
              id="checkOut"
              name="checkOut"
              min={today}
              required
              className={`w-full ${result?.errors?.checkOut ? "border-red-400" : ""}`}
            />
            {result?.errors?.checkOut && (
              <p className="text-xs text-red-500">{result.errors.checkOut}</p>
            )}
          </div>
        </div>

        {/* Kişi Sayısı */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="adults">Yetişkin</Label>
            <Input
              type="number"
              id="adults"
              name="adults"
              min="1"
              max="20"
              defaultValue="2"
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="children">Çocuk</Label>
            <Input
              type="number"
              id="children"
              name="children"
              min="0"
              max="20"
              defaultValue="0"
              required
              className="w-full"
            />
          </div>
        </div>

        {/* Kişisel Bilgiler */}
        <div className="space-y-2 pt-2">
          <Label htmlFor="name">Adınız Soyadınız</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Örn: Ahmet Yılmaz"
            required
            className={`w-full ${result?.errors?.name ? "border-red-400" : ""}`}
          />
          {result?.errors?.name && (
            <p className="text-xs text-red-500">{result.errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-posta</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="ornek@email.com"
            required
            className={`w-full ${result?.errors?.email ? "border-red-400" : ""}`}
          />
          {result?.errors?.email && (
            <p className="text-xs text-red-500">{result.errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefon Numarası</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            placeholder="0555 555 55 55"
            required
            className={`w-full ${result?.errors?.phone ? "border-red-400" : ""}`}
          />
          {result?.errors?.phone && (
            <p className="text-xs text-red-500">{result.errors.phone}</p>
          )}
        </div>

        {/* Not alanı — server action'da da okunuyor */}
        <div className="space-y-2">
          <Label htmlFor="note">
            Özel İstek / Not{" "}
            <span className="text-muted-foreground font-normal">(opsiyonel)</span>
          </Label>
          <Textarea
            id="note"
            name="note"
            placeholder="Özel istekleriniz, tercihleriniz veya sorularınız..."
            rows={3}
            maxLength={500}
            className="w-full resize-none"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg mt-4"
          disabled={isLoading}
        >
          {isLoading ? "İşleniyor..." : "Hemen Rezervasyon Yap"}
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-4">
          Ön onay talebi alınır — ödeme adımına yönlendirilmezsiniz.
        </p>
      </form>
    </div>
  );
}
