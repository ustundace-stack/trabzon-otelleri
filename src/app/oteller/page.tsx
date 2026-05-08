// Otel listeleme sayfası — URL search params ile filtreleme desteği
import HotelCard from "@/components/shared/HotelCard";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/shared/PageHero";
import { HotelFilterPanel } from "@/components/hotel/HotelFilterPanel";
import { Metadata } from "next";
import { hotelRepository } from "@/lib/repository-factory";
import { GetFilteredHotelsUseCase } from "@/core/application/use-cases/hotel/get-filtered-hotels.use-case";
import { HotelFilterParams } from "@/core/application/repositories/hotel.repository.interface";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Oteller | Trabzon Otelleri",
  description:
    "Trabzon'daki en iyi otelleri inceleyin, fiyatları karşılaştırın ve size en uygun konaklama seçeneğini bulun.",
};

// searchParams'ı HotelFilterParams'a dönüştüren yardımcı
function buildFilterParams(searchParams: Record<string, string | string[] | undefined>): HotelFilterParams {
  const params: HotelFilterParams = {};

  if (searchParams.search) params.search = String(searchParams.search);
  if (searchParams.termal === "true") params.hasThermal = true;

  const locations = searchParams.location;
  if (locations) {
    params.locations = Array.isArray(locations) ? locations : [locations];
  }

  if (searchParams.minPrice) params.minPrice = Number(searchParams.minPrice);
  if (searchParams.maxPrice) params.maxPrice = Number(searchParams.maxPrice);

  const sortBy = searchParams.sortBy as HotelFilterParams["sortBy"];
  if (sortBy) params.sortBy = sortBy;

  return params;
}

interface HotelsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function HotelsPage({ searchParams }: HotelsPageProps) {
  const resolvedParams = await searchParams;
  const filterParams = buildFilterParams(resolvedParams);
  const hotels = await new GetFilteredHotelsUseCase(hotelRepository).execute(filterParams);

  return (
    <div className="bg-muted/30 min-h-screen pb-20">
      <PageHero
        title="Trabzon Otelleri"
        description="Doğayla iç içe butik otellerden, lüks termal tesislere kadar aradığınız mükemmel konaklama deneyimini bulun."
      />

      <div className="container mx-auto px-4 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar / Filtreler — Suspense ile sarılı (useSearchParams client hook için) */}
          <aside className="w-full lg:w-1/4">
            <Suspense fallback={<div className="h-96 bg-white rounded-xl animate-pulse border border-border/50" />}>
              <HotelFilterPanel />
            </Suspense>
          </aside>

          {/* Otel Listesi */}
          <main className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-border/50">
              <div className="text-muted-foreground">
                <span className="font-bold text-foreground">{hotels.length}</span> otel bulundu
              </div>
            </div>

            {hotels.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-muted-foreground bg-white rounded-xl border border-border/50">
                <p className="text-lg font-medium mb-2">Sonuç bulunamadı</p>
                <p className="text-sm">Filtrelerinizi değiştirerek tekrar deneyin.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
