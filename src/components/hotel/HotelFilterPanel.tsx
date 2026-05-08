"use client";

// Otel filtre paneli — URL search params ile çalışır (client bileşen)
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter, Search, RotateCcw } from "lucide-react";

const LOCATIONS = ["Ortahisar (Merkez)", "Uzungöl", "Akçaabat", "Maçka", "Yomra"];
const SORT_OPTIONS = [
  { value: "recommended", label: "Önerilen" },
  { value: "price_asc", label: "Fiyat (Düşükten Yükseğe)" },
  { value: "price_desc", label: "Fiyat (Yüksekten Düşüğe)" },
  { value: "rating_desc", label: "Puan (En Yüksek)" },
];

export function HotelFilterPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL param değeri okuma yardımcısı
  const getParam = useCallback(
    (key: string) => searchParams.get(key) ?? "",
    [searchParams]
  );

  // URL'ye param güncelleme — mevcut parametreleri koruyarak günceller
  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  // Checkbox array param güncelleme
  const toggleArrayParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const existing = params.getAll(key);
      if (existing.includes(value)) {
        params.delete(key);
        existing.filter((v) => v !== value).forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  // Tüm filtreleri sıfırla
  const resetFilters = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  const hasFilters = searchParams.toString() !== "";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6 sticky top-28">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 font-heading font-bold text-lg text-foreground">
          <Filter className="w-5 h-5 text-accent" />
          Filtrele
        </div>
        {hasFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Sıfırla
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Metin Arama */}
        <div className="space-y-3">
          <Label htmlFor="filter-search">Otel Adı / Konum</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="filter-search"
              placeholder="Ara..."
              defaultValue={getParam("search")}
              className="pl-9"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateParam("search", (e.target as HTMLInputElement).value);
                }
              }}
              onBlur={(e) => updateParam("search", e.target.value)}
            />
          </div>
        </div>

        {/* Sıralama */}
        <div className="space-y-3">
          <Label htmlFor="filter-sort">Sıralama</Label>
          <select
            id="filter-sort"
            className="w-full h-9 px-3 border border-input rounded-md text-sm bg-white focus:ring-accent focus:border-accent"
            value={getParam("sortBy") || "recommended"}
            onChange={(e) => updateParam("sortBy", e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <Accordion multiple className="w-full">
          {/* Konum Filtresi */}
          <AccordionItem value="konum">
            <AccordionTrigger className="font-semibold hover:no-underline text-sm">
              Konum
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                {LOCATIONS.map((loc) => (
                  <div key={loc} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`loc-${loc}`}
                      checked={searchParams.getAll("location").includes(loc)}
                      onChange={() => toggleArrayParam("location", loc)}
                      className="rounded border-input w-4 h-4 accent-primary"
                    />
                    <label
                      htmlFor={`loc-${loc}`}
                      className="text-sm text-muted-foreground font-medium leading-none cursor-pointer"
                    >
                      {loc}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Kategori Filtresi */}
          <AccordionItem value="kategori">
            <AccordionTrigger className="font-semibold hover:no-underline text-sm">
              Kategori
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="cat-termal"
                    checked={getParam("termal") === "true"}
                    onChange={(e) =>
                      updateParam("termal", e.target.checked ? "true" : "")
                    }
                    className="rounded border-input w-4 h-4 accent-primary"
                  />
                  <label
                    htmlFor="cat-termal"
                    className="text-sm text-muted-foreground font-medium cursor-pointer"
                  >
                    Termal Oteller
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Fiyat Aralığı */}
          <AccordionItem value="fiyat">
            <AccordionTrigger className="font-semibold hover:no-underline text-sm">
              Fiyat Aralığı (Gecelik ₺)
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center gap-2 pt-1">
                <Input
                  placeholder="Min"
                  type="number"
                  min={0}
                  defaultValue={getParam("minPrice")}
                  className="h-9"
                  onBlur={(e) => updateParam("minPrice", e.target.value)}
                />
                <span className="text-muted-foreground shrink-0">—</span>
                <Input
                  placeholder="Max"
                  type="number"
                  min={0}
                  defaultValue={getParam("maxPrice")}
                  className="h-9"
                  onBlur={(e) => updateParam("maxPrice", e.target.value)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {hasFilters && (
          <Button
            variant="outline"
            className="w-full mt-2 text-muted-foreground hover:text-destructive hover:border-destructive"
            onClick={resetFilters}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Filtreleri Temizle
          </Button>
        )}
      </div>
    </div>
  );
}
