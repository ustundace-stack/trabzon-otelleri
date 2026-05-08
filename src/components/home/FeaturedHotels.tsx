import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { MapPin, Star, Waves } from "lucide-react";
import { hotelRepository } from "@/lib/repository-factory";
import { GetAllHotelsUseCase } from "@/core/application/use-cases/hotel/get-all-hotels.use-case";
import { Hotel } from "@/core/domain/entities/hotel.entity";

// Öne çıkan otelleri Use Case katmanından çeker (Server Component)
async function getFeaturedHotels(): Promise<Hotel[]> {
  const hotels = await new GetAllHotelsUseCase(hotelRepository).execute();
  return hotels.slice(0, 3);
}

export default async function FeaturedHotels() {
  const featuredHotels = await getFeaturedHotels();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-2 block">Seçkin Konaklama</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Öne Çıkan Oteller</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Misafirlerimizden en yüksek puanı alan, konforu ve eşsiz Trabzon manzarasıyla öne çıkan popüler otellerimiz.
            </p>
          </div>
          <Link href="/oteller" className="hidden md:flex mt-6 md:mt-0 items-center text-primary font-medium hover:text-accent transition-colors">
            Tümünü Gör →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHotels.map((hotel) => (
            <Card key={hotel.id} className="group overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col">
              <CardHeader className="p-0 relative h-64 overflow-hidden">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {hotel.hasThermal && (
                    <Badge className="bg-blue-500/90 text-white border-none flex items-center gap-1 backdrop-blur-sm">
                      <Waves className="w-3 h-3" /> Termal
                    </Badge>
                  )}
                  {hotel.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="bg-background/90 text-foreground backdrop-blur-sm border-none">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-heading text-xl font-bold text-foreground line-clamp-1" title={hotel.name}>
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded text-sm font-semibold text-primary">
                    <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{hotel.location}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">{hotel.reviews}</span> misafir değerlendirmesi
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex items-center justify-between mt-auto">
                <div>
                  <span className="text-xs text-muted-foreground block">Gecelik başlangıç</span>
                  <div className="text-xl font-bold text-primary">
                    {hotel.price.toLocaleString('tr-TR')} ₺
                  </div>
                </div>
                <Link href={`/oteller/${hotel.slug}`} className={buttonVariants({ className: "bg-primary hover:bg-primary/90" })}>
                  İncele
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/oteller" className={buttonVariants({ variant: "outline", className: "w-full" })}>Tüm Otelleri Gör</Link>
        </div>
      </div>
    </section>
  );
}
