import { Metadata } from "next";
import HotelCard from "@/components/shared/HotelCard";
import PageHero from "@/components/shared/PageHero";
import { Badge } from "@/components/ui/badge";
import { Waves } from "lucide-react";
import { PrismaHotelRepository } from "@/infrastructure/data/repositories/prisma-hotel.repository";
import { GetThermalHotelsUseCase } from "@/core/application/use-cases/hotel/get-thermal-hotels.use-case";

export const metadata: Metadata = {
  title: "Trabzon Termal Otelleri | Trabzon Otelleri",
  description: "Trabzon ve çevresindeki en iyi termal oteller. Şifalı sular ve spa tesisleriyle dinlenin.",
};

export default async function ThermalHotelsPage() {
  // Use Case katmanı üzerinden termal otelleri çek
  const hotelRepo = new PrismaHotelRepository();
  const thermalHotels = await new GetThermalHotelsUseCase(hotelRepo).execute();

  return (
    <div className="bg-muted/30 min-h-screen pb-20">
      <PageHero
        title="Termal Oteller"
        description="Trabzon ve çevresindeki en iyi termal tesislerde şifalı sularda dinlenin. Sağlıklı ve rahatlatıcı bir tatil için ideal seçenekler."
        badge={
          <Badge className="bg-accent/20 text-accent border border-accent/30 text-sm font-semibold tracking-wider px-4 py-1.5 flex items-center gap-2">
            <Waves className="w-4 h-4" />
            KATEGORİ
          </Badge>
        }
      />

      <div className="container mx-auto px-4 lg:px-8 mt-12">
        <div className="mb-8 text-muted-foreground">
          <span className="font-bold text-foreground">{thermalHotels.length}</span> termal otel bulundu
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {thermalHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}
