import Image from "next/image";
import { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Hakkımızda | Trabzon Otelleri",
  description: "Trabzon Otelleri olarak misyonumuz, vizyonumuz ve değerlerimiz.",
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        title="Hakkımızda"
        description="Trabzon'un eşsiz doğasını ve kültürünü misafirlerimizle en iyi şekilde buluşturmak için çalışıyoruz."
      />

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-foreground">Biz Kimiz?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Trabzon Otelleri, bölgedeki en seçkin, lüks ve konforlu konaklama tesislerini tek bir çatı altında toplayan premium bir platformdur. Amacımız, yerli ve yabancı turistlerin Karadeniz&apos;in incisi Trabzon&apos;da kusursuz bir tatil deneyimi yaşamasını sağlamaktır.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Uzman ekibimizle birlikte, misafirlerimize en uygun fiyat garantisiyle güvenilir rezervasyon imkanı sunarken, 7/24 destek hattımızla her adımda yanlarında oluyoruz.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border/50">
              <div>
                <div className="text-4xl font-bold text-accent mb-2">10+</div>
                <div className="text-foreground font-semibold">Yıllık Deneyim</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">50+</div>
                <div className="text-foreground font-semibold">Seçkin Tesis</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">10K+</div>
                <div className="text-foreground font-semibold">Mutlu Misafir</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">7/24</div>
                <div className="text-foreground font-semibold">Müşteri Desteği</div>
              </div>
            </div>
          </div>
          
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop"
              alt="Trabzon Hakkımızda"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          </div>
        </div>
      </div>
    </div>
  );
}
