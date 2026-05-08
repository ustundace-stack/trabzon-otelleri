import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Misafir yorum verisi
const testimonials = [
  {
    id: 1,
    name: "Ayşe Kaya",
    location: "İstanbul",
    rating: 5,
    text: "Trabzon Uzungöl'de geçirdiğimiz 4 gecelik tatil hayatımızın en güzel tatiliydi. Otel muhteşem, manzara nefes kesici. Reservasyon sürecinde de çok yardımcı oldular.",
    hotel: "Trabzon Uzungöl Premium Resort",
    avatar: "AK",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Mehmet Demir",
    location: "Ankara",
    rating: 5,
    text: "Hıdırnebi termal oteli inanılmaz bir deneyimdi. Termal sular gerçekten şifalı, spa hizmetleri de çok profesyoneldi. Personelin güler yüzü ve yardımseverliği de ayrı bir artı.",
    hotel: "Hıdırnebi Termal Spa Hotel",
    avatar: "MD",
    color: "bg-emerald-500",
  },
  {
    id: 3,
    name: "Zeynep Arslan",
    location: "İzmir",
    rating: 5,
    text: "Sümela Doğa Evleri bambaşka bir atmosfer sunuyor. Sabah kahvaltısı organik köy ürünleri ile süper. Ormanda uyandığımızda kuş seslerini duymak tarifsiz. Kesinlikle tavsiye ederim!",
    hotel: "Sümela Doğa Evleri",
    avatar: "ZA",
    color: "bg-violet-500",
  },
  {
    id: 4,
    name: "Fatih Yıldız",
    location: "Bursa",
    rating: 4,
    text: "Trabzon City Center Hotel iş seyahatim için ideal bir seçimdi. Şehir merkezine çok yakın, temiz ve konforlu odalar. Fiyat-performans açısından oldukça başarılı.",
    hotel: "Trabzon City Center Hotel",
    avatar: "FY",
    color: "bg-orange-500",
  },
  {
    id: 5,
    name: "Selin Çelik",
    location: "Konya",
    rating: 5,
    text: "Ayder Termal & Spa'ya gitmek en iyi kararımızdı. Doğal termal havuzu ve lüks odalarıyla hem dinlendik hem de sağlığımıza kavuştuk. Restoranda Karadeniz mutfağı da şahane.",
    hotel: "Ayder Termal & Spa Resort",
    avatar: "SÇ",
    color: "bg-rose-500",
  },
  {
    id: 6,
    name: "Ahmet Öztürk",
    location: "Trabzon",
    rating: 5,
    text: "Yomra Seaside Hotel'de Karadeniz'in muhteşem manzarasını seyrettik. Deniz havası, sakin ortam ve güler yüzlü personel. Aile tatili için harika bir seçim, kesinlikle tekrar gideceğiz.",
    hotel: "Yomra Seaside Hotel",
    avatar: "AÖ",
    color: "bg-teal-500",
  },
];

// Yıldız puanı bileşeni
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Başlık */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-2 block">
            Misafir Görüşleri
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Misafirlerimiz Ne Diyor?
          </h2>
          <p className="text-muted-foreground text-lg">
            Binlerce mutlu misafirimizin gerçek deneyimlerini keşfedin. Güvenilir platformumuz üzerinden her yorum doğrulanmaktadır.
          </p>
        </div>

        {/* Yorum Kartları — 2 sıra kaydırmalı grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card
              key={t.id}
              className="group border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden"
            >
              {/* Dekoratif tırnak işareti */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-primary" />
              </div>

              <CardContent className="p-6">
                {/* Puan */}
                <StarRating rating={t.rating} />

                {/* Yorum metni */}
                <p className="text-muted-foreground leading-relaxed mt-4 mb-6 text-sm line-clamp-4">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Kullanıcı bilgisi */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <div
                    className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.location}</div>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground text-right max-w-[120px] leading-tight">
                    {t.hotel}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Genel Puanlama Özeti */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 py-10 bg-muted/30 rounded-3xl border border-border/50">
          <div className="text-center">
            <div className="font-heading text-5xl font-bold text-primary mb-1">4.9</div>
            <StarRating rating={5} />
            <div className="text-muted-foreground text-sm mt-2">Genel Puan</div>
          </div>
          <div className="w-px h-16 bg-border/50 hidden sm:block" />
          <div className="text-center">
            <div className="font-heading text-5xl font-bold text-primary mb-2">10K+</div>
            <div className="text-muted-foreground text-sm">Doğrulanmış Yorum</div>
          </div>
          <div className="w-px h-16 bg-border/50 hidden sm:block" />
          <div className="text-center">
            <div className="font-heading text-5xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground text-sm">Tavsiye Oranı</div>
          </div>
          <div className="w-px h-16 bg-border/50 hidden sm:block" />
          <div className="text-center">
            <div className="font-heading text-5xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground text-sm">Seçkin Tesis</div>
          </div>
        </div>
      </div>
    </section>
  );
}
