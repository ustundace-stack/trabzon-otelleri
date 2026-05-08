# Trabzon Otelleri 🏨

Trabzon ve çevresindeki en iyi otelleri keşfetmenizi sağlayan premium bir konaklama platformu.

## 🌐 Canlı Site

**[https://trabzon-otelleri.vercel.app](https://trabzon-otelleri.vercel.app)**

## 🛠️ Teknoloji Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **UI:** shadcn/ui
- **ORM:** Prisma
- **Deployment:** Vercel
- **Mimari:** Clean Architecture + DDD

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
├── components/
│   ├── home/               # Ana sayfa bileşenleri
│   ├── hotel/              # Otel filtreleme ve rezervasyon
│   ├── shared/             # Ortak bileşenler (Navbar, Footer)
│   └── ui/                 # shadcn/ui bileşenleri
├── core/
│   ├── domain/             # Domain entities
│   └── application/        # Use Cases + Repository interfaces
├── infrastructure/
│   └── data/               # Mock + Prisma repository implementations
└── lib/                    # Yardımcı araçlar
```

## 🚀 Geliştirme

```bash
npm install
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışır.

## 📦 Deployment

Her `main` branch'ine push otomatik olarak Vercel'e deploy edilir.

```bash
git add .
git commit -m "feat: yeni özellik"
git push origin main
# → Vercel otomatik deploy başlar
```

## 📄 Sayfalar

| Sayfa | Route |
|---|---|
| Ana Sayfa | `/` |
| Otel Listesi | `/oteller` |
| Otel Detay | `/oteller/[slug]` |
| Termal Oteller | `/oteller/termal` |
| Lüks Oteller | `/oteller/luks` |
| Butik Oteller | `/oteller/butik` |
| Aile Otelleri | `/oteller/aile` |
| Doğa Otelleri | `/oteller/doga` |
| Şehir Otelleri | `/oteller/sehir` |
| Blog | `/blog` |
| Blog Detay | `/blog/[slug]` |
| Hakkımızda | `/hakkimizda` |
| İletişim | `/iletisim` |
| SSS | `/sss` |
| Admin | `/admin` |
