import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { MapPin, Star, Waves, Wifi, Coffee } from "lucide-react";

export interface HotelProps {
  id: number;
  name: string;
  slug: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  tags: string[];
  hasThermal: boolean;
  features: string[];
}

export default function HotelCard({ hotel }: { hotel: HotelProps }) {
  return (
    <Card className="group overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col h-full">
      <CardHeader className="p-0 relative h-56 overflow-hidden">
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
          {hotel.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-background/90 text-foreground backdrop-blur-sm border-none">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-heading text-xl font-bold text-foreground line-clamp-2" title={hotel.name}>
            {hotel.name}
          </h3>
          <div className="flex shrink-0 items-center gap-1 bg-primary/5 px-2 py-1 rounded text-sm font-semibold text-primary">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            <span>{hotel.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="line-clamp-1">{hotel.location}</span>
        </div>

        {/* Özellik İkonları */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
              <Wifi className="w-3.5 h-3.5" />
              <span>Ücretsiz WiFi</span>
            </div>
            <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
              <Coffee className="w-3.5 h-3.5" />
              <span>Kahvaltı</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="text-foreground font-bold">{hotel.reviews}</span> Yorum
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex items-center justify-between mt-auto bg-muted/10">
        <div>
          <span className="text-xs text-muted-foreground block mb-1">Gecelik başlangıç</span>
          <div className="text-2xl font-bold text-primary">
            {hotel.price.toLocaleString('tr-TR')} ₺
          </div>
        </div>
        <Link href={`/oteller/${hotel.slug}`} className={buttonVariants({ className: "bg-primary hover:bg-primary/90 px-6" })}>
          İncele
        </Link>
      </CardFooter>
    </Card>
  );
}
