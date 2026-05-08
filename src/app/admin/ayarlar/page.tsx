// Admin Ayarlar Sayfası — Sistem yapılandırma bilgileri
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { Server, Database, Lock, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Ayarlar | Trabzon Admin",
  description: "Sistem ayarlarını ve yapılandırma bilgilerini görüntüleyin.",
};

export default function AdminSettingsPage() {
  const systemInfo = [
    {
      label: "Ortam",
      value: process.env.NODE_ENV ?? "development",
      icon: Server,
      badge: process.env.NODE_ENV === "production" ? "Canlı" : "Geliştirme",
      badgeClass:
        process.env.NODE_ENV === "production"
          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
          : "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      label: "Veritabanı",
      value: "SQLite (Prisma ORM)",
      icon: Database,
      badge: "Bağlı",
      badgeClass: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      label: "Kimlik Doğrulama",
      value: "JWT (jose) — HttpOnly Cookie",
      icon: Lock,
      badge: "Aktif",
      badgeClass: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      label: "Uygulama URL",
      value: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      icon: Globe,
      badge: "Yapılandırıldı",
      badgeClass: "bg-blue-50 text-blue-600 border-blue-200",
    },
  ];

  const featureFlags = [
    { name: "Rezervasyon Sistemi", status: true },
    { name: "Admin Paneli Auth", status: true },
    { name: "Zod Form Validasyonu", status: true },
    { name: "Dinamik Sitemap", status: true },
    { name: "Blog Modülü", status: true },
    { name: "Ödeme Entegrasyonu", status: false },
    { name: "E-posta Bildirimleri", status: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Ayarlar</h1>
        <p className="text-muted-foreground mt-1">
          Sistem yapılandırma bilgileri ve özellik durumları.
        </p>
      </div>

      {/* Sistem Bilgileri */}
      <Card className="border-border/50">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="text-base">Sistem Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border/50">
          {systemInfo.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted/50 rounded-lg">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground font-mono">{item.value}</p>
                  </div>
                </div>
                <Badge variant="outline" className={item.badgeClass}>
                  {item.badge}
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Özellik Bayrakları */}
      <Card className="border-border/50">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="text-base">Özellik Durumları</CardTitle>
          <p className="text-sm text-muted-foreground">Sistemdeki modüllerin aktiflik durumu</p>
        </CardHeader>
        <CardContent className="divide-y divide-border/50">
          {featureFlags.map((flag) => (
            <div key={flag.name} className="flex items-center justify-between py-4">
              <span className="text-sm font-medium text-foreground">{flag.name}</span>
              <Badge
                variant="outline"
                className={
                  flag.status
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                    : "bg-slate-50 text-slate-500 border-slate-200"
                }
              >
                {flag.status ? "Aktif" : "Yakında"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Geliştirici Notu */}
      <Card className="border-border/50 bg-amber-50/50">
        <CardContent className="p-6">
          <p className="text-sm text-amber-800 font-medium">
            ⚠️ Geliştirici Notu
          </p>
          <p className="text-sm text-amber-700 mt-1">
            Üretim ortamına geçmeden önce: güçlü bir JWT_SECRET tanımlayın, SQLite yerine PostgreSQL
            kullanın ve e-posta bildirim sistemi entegre edin.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
