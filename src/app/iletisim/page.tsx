import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "İletişim | Trabzon Otelleri",
  description: "Bize ulaşın. Trabzon Otelleri müşteri hizmetleri ve iletişim bilgileri.",
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pb-20">
      <PageHero
        title="İletişim"
        description="Sorularınız, rezervasyon talepleriniz veya önerileriniz için bize 7/24 ulaşabilirsiniz."
      />

      <div className="container mx-auto px-4 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* İletişim Formu */}
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8">Bize Mesaj Gönderin</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Adınız</Label>
                  <Input id="firstName" placeholder="Adınız" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Soyadınız</Label>
                  <Input id="lastName" placeholder="Soyadınız" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta Adresiniz</Label>
                  <Input id="email" type="email" placeholder="ornek@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon Numaranız</Label>
                  <Input id="phone" type="tel" placeholder="05XX XXX XX XX" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Konu</Label>
                <Input id="subject" placeholder="Mesajınızın konusu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mesajınız</Label>
                <Textarea id="message" placeholder="Size nasıl yardımcı olabiliriz?" className="min-h-[150px] resize-none" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg font-semibold">Gönder</Button>
            </form>
          </div>

          {/* İletişim Bilgileri */}
          <div className="bg-muted/30 p-8 rounded-3xl border border-border/50 h-fit">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8">İletişim Bilgileri</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Adres</h3>
                  <p className="text-muted-foreground">Ortahisar Merkez, Meydan Bölgesi<br/>Trabzon / Türkiye</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Telefon</h3>
                  <p className="text-muted-foreground">+90 (462) 000 00 00<br/>+90 (532) 000 00 00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">E-posta</h3>
                  <p className="text-muted-foreground">info@trabzonotelleri.com<br/>rezervasyon@trabzonotelleri.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Çalışma Saatleri</h3>
                  <p className="text-muted-foreground">Pazartesi - Pazar: 7/24<br/>(Destek Hattı)</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 bg-border/50 w-full h-64 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5"></div>
              <span className="text-muted-foreground font-semibold">Google Haritalar Alanı</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
