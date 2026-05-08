"use client";

// Hero arama kutusu — kullanıcı girişini URL parametresi ile /oteller sayfasına iletir
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Users, MapPin, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // Arama formunu /oteller?search= URL'ye yönlendir
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    router.push(`/oteller${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Arkaplan Görseli */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop"
          alt="Trabzon Dağ Manzarası"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Koyu katman — okunabilirlik için */}
        <div className="absolute inset-0 bg-primary/65 mix-blend-multiply" />
        {/* Gradient geçişi — alta doğru soluklaşır */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/80" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center pt-20 pb-32">
        {/* Üst etiket */}
        <span className="inline-block py-1.5 px-4 rounded-full bg-accent/20 text-accent border border-accent/40 text-sm font-semibold tracking-widest mb-6 backdrop-blur-sm">
          ✦ TRABZON&apos;UN EN İYİ OTELLERİ ✦
        </span>

        {/* Ana başlık */}
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-5xl drop-shadow-lg">
          Doğanın Kalbinde{" "}
          <span className="text-accent italic relative">
            Kusursuz Bir Tatil
            {/* Alt çizgi dekorasyon */}
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent/60 rounded-full" />
          </span>{" "}
          Deneyimi
        </h1>

        {/* Alt açıklama */}
        <p className="text-lg md:text-xl text-white/85 mb-12 max-w-2xl font-light leading-relaxed">
          Trabzon&apos;un eşsiz doğasında lüks, termal ve butik otelleri keşfedin.{" "}
          <span className="text-accent font-medium">Güvenilir rezervasyon</span> ile hayalinizdeki tatili hemen planlayın.
        </p>

        {/* Arama Kutusu */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-5xl bg-background/96 backdrop-blur-xl p-4 md:p-5 rounded-2xl shadow-2xl shadow-black/30 border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Konum / Otel Arama */}
            <div className="flex flex-col gap-1.5 md:col-span-1">
              <label className="text-xs font-semibold text-foreground/70 ml-1 uppercase tracking-wide">
                Konum / Otel Adı
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-accent" />
                <Input
                  id="hero-search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nereye gitmek istersiniz?"
                  className="pl-10 h-12 bg-background border-border/50 focus:border-accent/50 transition-colors"
                />
              </div>
            </div>

            {/* Tarih */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-foreground/70 ml-1 uppercase tracking-wide">
                Giriş - Çıkış
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                <Input
                  id="hero-date"
                  type="text"
                  placeholder="Tarih Seçin"
                  className="pl-10 h-12 bg-background border-border/50 cursor-pointer"
                  readOnly
                />
              </div>
            </div>

            {/* Misafir Sayısı */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-foreground/70 ml-1 uppercase tracking-wide">
                Misafirler
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                <Input
                  id="hero-guests"
                  type="text"
                  placeholder="2 Yetişkin, 0 Çocuk"
                  className="pl-10 h-12 bg-background border-border/50 cursor-pointer pr-8"
                  readOnly
                />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Ara Butonu */}
            <div className="flex items-end">
              <Button
                type="submit"
                id="hero-search-btn"
                className="w-full h-12 bg-accent text-primary font-bold text-base hover:bg-accent/90 transition-all shadow-lg hover:shadow-accent/30 gap-2"
              >
                <Search className="w-5 h-5" />
                Otel Bul
              </Button>
            </div>
          </div>
        </form>

        {/* Hızlı filtre etiketleri */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <span className="text-white/60 text-sm">Popüler:</span>
          {["Uzungöl", "Sümela", "Termal", "Aile Oteli", "Butik"].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                const params = new URLSearchParams({ search: tag });
                router.push(`/oteller?${params.toString()}`);
              }}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-sm border border-white/20 hover:border-white/40 transition-all cursor-pointer backdrop-blur-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Aşağı kaydır animasyonu */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
