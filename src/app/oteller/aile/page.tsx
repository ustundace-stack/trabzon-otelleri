// Aile dostu oteller kategori sayfası
import { Metadata } from "next";
import HotelCard from "@/components/shared/HotelCard";
import PageHero from "@/components/shared/PageHero";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { hotelRepository } from "@/lib/repository-factory";
import { GetFilteredHotelsUseCase } from "@/core/application/use-cases/hotel/get-filtered-hotels.use-case";

export const metadata: Metadata = {
  title: "Trabzon Aile Otelleri | Trabzon Otelleri",
  description: "Trabzon'da ailenizle birlikte keyifli bir tatil geçirmek için en uygun aile dostu otel seçenekleri.",
};

export default async function FamilyHotelsPage() {
  const hotels = await new GetFilteredHotelsUseCase(hotelRepository).execute({ tags: ["Aile"] });

  return (
    <div className="bg-muted/30 min-h-screen pb-20">
      <PageHero
        title="Aile Dostu Oteller"
        description="Çocuklarınızla birlikte güvenli ve eğlenceli bir tatil için özel olarak seçilmiş aile dostu konaklama seçenekleri."
        badge={
          <Badge className="bg-accent/20 text-accent border border-accent/30 text-sm font-semibold tracking-wider px-4 py-1.5 flex items-center gap-2">
            <Users className="w-4 h-4" />
            KATEGORİ
          </Badge>
        }
      />

      <div className="container mx-auto px-4 lg:px-8 mt-12">
        <div className="mb-8 text-muted-foreground">
          <span className="font-bold text-foreground">{hotels.length}</span> aile dostu otel bulundu
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.length > 0 ? (
            hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
          ) : (
            <div className="col-span-3 py-24 text-center text-muted-foreground">
              <p className="text-lg">Bu kategoride henüz otel bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
