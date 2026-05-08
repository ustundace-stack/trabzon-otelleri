// 0001: Clean Architecture ve N-Tier Prensiplerinin Uygulanması — Trabzon Otelleri
//
// Tarih: 2026-05-04
// Durum: Kabul Edildi

## Bağlam ve Problem

Mevcut proje tek bir `src/lib/hotels-data.ts` dosyasında hem TypeScript tiplerini, hem mock
veriyi, hem de yardımcı fonksiyonları barındırıyordu. Sayfalar bu dosyayı doğrudan import
ederek kullanıyordu. Bu yapı;
- SOLID prensiplerini (özellikle Dependency Inversion) ihlal ediyordu
- İş mantığını sunum katmanına sıkıştırıyordu
- İleride bir veritabanı veya harici API'ya geçişi zorlaştırıyordu
- Test edilebilirliği düşürüyordu

## Değerlendirilen Alternatifler

1. **Mevcut yapıyı korumak** — Hızlı ama teknik borç biriktirir
2. **Basit helper fonksiyonlar eklemek** — Kısmi çözüm, kök problemi çözmez
3. **Tam Clean Architecture uygulamak (Seçilen)** — Uzun vadede sürdürülebilir

## Uygulanan Mimari

```
src/
├── core/
│   ├── domain/entities/         # Hotel, BlogPost — saf tipler, bağımlılık yok
│   └── application/
│       ├── repositories/        # IHotelRepository, IBlogPostRepository — soyut arayüzler
│       └── use-cases/           # GetAllHotels, GetHotelBySlug, GetThermalHotels vb.
├── infrastructure/
│   └── data/
│       ├── mock/                # Statik mock veri
│       └── repositories/        # MockHotelRepository, MockBlogPostRepository
├── components/                  # Presentation: UI bileşenleri
└── app/                         # Next.js App Router — Controller + DI Container rolü
```

## Sonuçlar

**Olumlu:**
- Tüm sayfalar artık Use Case'leri kullanıyor; veri kaynağından bağımsız
- Veritabanına geçmek için sadece Infrastructure katmanı değişecek
- Open/Closed prensibi: Mevcut kod dokunulmadan yeni özellik eklenebilir
- Sitemap artık dinamik — Use Case'lerden besleniyor

**Olumsuz:**
- Başlangıçta daha fazla dosya — ancak bu uzun vadede teknik borcu önler
