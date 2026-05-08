"use client";

// Bülten Kayıt CTA Bölümü — e-posta girişini handle eder
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2, Send } from "lucide-react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Form gönderim işleyicisi (şimdilik mock)
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // Gerçek senaryoda API çağrısı yapılacak
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Dekoratif arka plan deseni */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-white/50 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* İkon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 mb-6">
            <Mail className="w-8 h-8 text-accent" />
          </div>

          {/* Başlık */}
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Trabzon&apos;daki En İyi Fırsatları{" "}
            <span className="text-accent">Kaçırmayın</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
            Haftanın özel otel indirimleri, sezon kampanyaları ve Trabzon gezi rehberlerini doğrudan posta kutunuza göndermemiz için haber bültenimize kayıt olun.
          </p>

          {/* Form */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-3 py-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              <CheckCircle2 className="w-14 h-14 text-accent" />
              <h3 className="font-heading text-2xl font-bold text-white">
                Başarıyla Kayıt Oldunuz!
              </h3>
              <p className="text-primary-foreground/80">
                En güncel fırsatlardan haberdar edileceksiniz.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              id="newsletter-form"
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                  className="pl-10 h-13 bg-white border-white text-foreground placeholder:text-muted-foreground rounded-xl"
                />
              </div>
              <Button
                type="submit"
                id="newsletter-submit"
                className="h-13 px-8 bg-accent text-primary font-bold hover:bg-accent/90 transition-all shadow-lg shadow-black/20 gap-2 rounded-xl shrink-0"
              >
                <Send className="w-4 h-4" />
                Abone Ol
              </Button>
            </form>
          )}

          {/* Güven notu */}
          {!submitted && (
            <p className="text-primary-foreground/50 text-xs mt-4">
              Spam göndermiyoruz. Dilediğiniz zaman abonelikten çıkabilirsiniz.
            </p>
          )}

          {/* Özellik maddeleri */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/10">
            {[
              { icon: "🏷️", title: "Haftalık İndirimler", desc: "Özel üye fiyatlarına erişin" },
              { icon: "🗺️", title: "Gezi Rehberleri", desc: "Trabzon'u uzmanlardan öğrenin" },
              { icon: "🏨", title: "Yeni Tesisler", desc: "İlk siz haberdar olun" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{item.icon}</span>
                <h4 className="font-heading font-bold text-white">{item.title}</h4>
                <p className="text-primary-foreground/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
