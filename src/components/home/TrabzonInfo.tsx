import Image from "next/image";
import { CheckCircle2, ShieldCheck, HeadphonesIcon, ThumbsUp } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: ShieldCheck,
    title: "Güvenli Rezervasyon",
    description: "Kişisel verileriniz ve ödemeleriniz yüksek güvenlik standartlarıyla korunur."
  },
  {
    icon: ThumbsUp,
    title: "En İyi Fiyat Garantisi",
    description: "Trabzon'daki oteller için aracı kurum olmadan en avantajlı fiyatları sunuyoruz."
  },
  {
    icon: HeadphonesIcon,
    title: "7/24 Misafir Destek Hattı",
    description: "Tatiliniz boyunca yaşayabileceğiniz her türlü sorun için yanınızdayız."
  },
  {
    icon: CheckCircle2,
    title: "Onaylı ve Seçkin Oteller",
    description: "Sadece misafir memnuniyeti yüksek, kalite standartlarını karşılayan oteller."
  }
];

export default function TrabzonInfo() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Sol Taraf - Trabzon Tanıtımı */}
          <div className="space-y-8">
            <span className="text-accent font-semibold tracking-wider text-sm uppercase block">Karadeniz&apos;in İncisi</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary leading-tight">
              Trabzon&apos;un Eşsiz Doğasında Yeniden Doğuş
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Yeşilin binbir tonu, hırçın Karadeniz dalgaları ve yüzyıllara meydan okuyan tarihi ile Trabzon, unutulmaz bir tatil vadediyor. Uzungöl&apos;ün mistik havasından Sümela Manastırı&apos;nın gizemine, Ayder Yaylası&apos;nın şifalı sularından yöresel lezzetlere kadar Karadeniz&apos;in kalbini bizimle keşfedin.
            </p>
            <div className="pt-4 border-t border-border/50">
              <h3 className="font-heading text-2xl font-semibold mb-6 text-foreground">Neden Bizi Seçmelisiniz?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                        <feature.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-6">
              <Link href="/hakkimizda" className={buttonVariants({ size: "lg", className: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8" })}>Daha Fazla Bilgi</Link>
            </div>
          </div>

          {/* Sağ Taraf - Görseller */}
          <div className="relative h-[600px] hidden lg:block">
            {/* Main Image */}
            <div className="absolute right-0 top-0 w-4/5 h-4/5 rounded-3xl overflow-hidden shadow-2xl z-10">
              <Image 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop"
                alt="Trabzon Uzungöl Manzarası"
                fill
                className="object-cover"
              />
            </div>
            {/* Accent Image (Overlapping) */}
            <div className="absolute left-0 bottom-0 w-3/5 h-2/3 rounded-3xl overflow-hidden shadow-2xl border-8 border-white z-20">
              <Image 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop"
                alt="Trabzon Şehir Merkezi"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
