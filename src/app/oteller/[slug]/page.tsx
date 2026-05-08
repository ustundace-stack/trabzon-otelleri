import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Star, Check, Waves, Wifi, Coffee, Car, Wind, Utensils, CalendarDays, Users } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GetHotelBySlugUseCase } from "@/core/application/use-cases/hotel/get-hotel-by-slug.use-case";
import { ReservationForm } from "@/components/hotel/ReservationForm";
import { hotelRepository } from "@/lib/repository-factory";

// İkon haritası: string icon adını Lucide bileşenine dönüştürür
const iconMap: Record<string, React.ElementType> = {
  wifi: Wifi,
  coffee: Coffee,
  car: Car,
  wind: Wind,
  utensils: Utensils,
  waves: Waves,
  users: Users,
  sparkles: Check,
  treePine: Check,
};

// Use Case — repository factory singleton kullanır
const getHotelBySlugUseCase = new GetHotelBySlugUseCase(hotelRepository);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hotel = await getHotelBySlugUseCase.execute(slug);
  if (!hotel) return { title: "Otel Bulunamadı | Trabzon Otelleri" };
  return {
    title: `${hotel.name} | Trabzon Otelleri`,
    description: hotel.description.slice(0, 160),
  };
}

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hotel = await getHotelBySlugUseCase.execute(slug);

  // Otel bulunamazsa 404 sayfasına yönlendir
  if (!hotel) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Galeri Bölümü */}
      <section className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px] md:h-[500px]">
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden group">
            <Image
              src={hotel.images[0]}
              alt={hotel.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="hidden md:flex flex-col gap-4">
            <div className="relative flex-1 rounded-2xl overflow-hidden group">
              <Image
                src={hotel.images[1]}
                alt={`${hotel.name} Oda`}
                fill
                sizes="33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative flex-1 rounded-2xl overflow-hidden group">
              <Image
                src={hotel.images[2]}
                alt={`${hotel.name} Restoran`}
                fill
                sizes="33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/30 transition-colors">
                <span className="text-white font-semibold text-lg border-2 border-white px-4 py-2 rounded-lg backdrop-blur-sm">
                  Tüm Fotoğrafları Gör
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <section className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Sol Kolon — Detaylar */}
          <div className="lg:col-span-2 space-y-12">

            {/* Başlık Bilgileri */}
            <div className="border-b border-border/50 pb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.tags.map((tag) => (
                  <Badge key={tag} className="bg-accent text-primary hover:bg-accent/90 border-none px-3 py-1 text-sm font-medium">
                    {tag}
                  </Badge>
                ))}
                {hotel.hasThermal && (
                  <Badge className="bg-blue-500/90 text-white border-none flex items-center gap-1">
                    <Waves className="w-3 h-3" /> Termal
                  </Badge>
                )}
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                {hotel.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="font-medium text-foreground">{hotel.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded text-sm font-bold text-primary">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span>{hotel.rating}</span>
                  </div>
                  <span>({hotel.reviews} değerlendirme)</span>
                </div>
              </div>
            </div>

            {/* Açıklama */}
            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-bold text-foreground">Otel Hakkında</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{hotel.description}</p>
            </div>

            {/* Öne Çıkan Özellikler */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">Öne Çıkan Özellikler</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.detailedFeatures.map((feature, i) => {
                  const Icon = iconMap[feature.icon] ?? Check;
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-muted/20">
                      <Icon className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-foreground font-medium text-sm">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Oda Tipleri */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">Oda Tipleri ve Fiyatlar</h2>
              <div className="space-y-4">
                {hotel.rooms.map((room, i) => (
                  <Card key={i} className="overflow-hidden border border-border/60 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-center">
                      <div className="p-6 flex-1 w-full">
                        <h3 className="font-bold text-xl text-foreground mb-2">{room.name}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" /> {room.capacity}
                          </span>
                          <span className="flex items-center gap-1">
                            <Check className="w-4 h-4 text-green-600" /> {room.bed}
                          </span>
                          <span className="flex items-center gap-1">
                            <Check className="w-4 h-4 text-green-600" /> Ücretsiz İptal
                          </span>
                        </div>
                      </div>
                      <div className="bg-muted/30 p-6 sm:w-64 w-full border-t sm:border-t-0 sm:border-l border-border/60 flex flex-col justify-center items-center text-center">
                        <span className="text-sm text-muted-foreground mb-1">Gecelik</span>
                        <span className="text-3xl font-bold text-primary mb-3">
                          {room.price.toLocaleString("tr-TR")} ₺
                        </span>
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Seç</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

          </div>

          {/* Sağ Kolon — Yapışkan Rezervasyon Formu */}
          <div className="lg:col-span-1">
            <ReservationForm hotelId={hotel.id} pricePerNight={hotel.price} />
            
            {/* Geri Dön */}
            <div className="mt-4 px-2">
              <Link href="/oteller" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                ← Tüm Otellere Dön
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
