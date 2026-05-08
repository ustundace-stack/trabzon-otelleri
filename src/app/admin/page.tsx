// Admin Dashboard — tüm metrikler Prisma'dan gerçek zamanlı çekilir
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CalendarDays, TrendingUp, Users, Clock } from "lucide-react";

// Sayfa her istekte yeniden oluşturulur — gerçek zamanlı veriler için
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Tüm metrikleri paralel olarak çek — performans için Promise.all kullan
  const [
    hotelCount,
    totalReservationCount,
    pendingReservationCount,
    approvedReservationCount,
    revenueResult,
    userCount,
    recentReservations,
  ] = await Promise.all([
    prisma.hotel.count(),
    prisma.reservation.count(),
    prisma.reservation.count({ where: { status: "pending" } }),
    prisma.reservation.count({ where: { status: "approved" } }),
    prisma.reservation.aggregate({
      _sum: { totalAmount: true },
      where: { status: "approved" },
    }),
    prisma.user.count(),
    prisma.reservation.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { hotel: { select: { name: true } } },
    }),
  ]);

  const totalRevenue = revenueResult._sum.totalAmount ?? 0;

  const stats = [
    {
      title: "Toplam Otel",
      value: hotelCount.toString(),
      description: "Sistemdeki aktif otel sayısı",
      icon: Building2,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Toplam Rezervasyon",
      value: totalReservationCount.toString(),
      description: `${pendingReservationCount} adet bekliyor`,
      icon: CalendarDays,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      title: "Onaylanan Gelir",
      value: `₺${totalRevenue.toLocaleString("tr-TR")}`,
      description: `${approvedReservationCount} onaylı rezervasyondan`,
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      title: "Kayıtlı Kullanıcı",
      value: userCount.toLocaleString("tr-TR"),
      description: "Sistemdeki toplam kullanıcı",
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: "Bekliyor", color: "text-amber-600 bg-amber-50" },
    approved: { label: "Onaylandı", color: "text-emerald-600 bg-emerald-50" },
    rejected: { label: "İptal", color: "text-red-600 bg-red-50" },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Sistemin gerçek zamanlı durumunu ve istatistiklerini buradan takip edin.
        </p>
      </div>

      {/* Özet Kartları — gerçek Prisma verileri */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Son Rezervasyonlar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-base font-semibold">Bekleyen Rezervasyonlar</CardTitle>
            <p className="text-sm text-muted-foreground">
              {pendingReservationCount} adet onay bekliyor
            </p>
          </CardHeader>
          <CardContent className="p-0">
            {pendingReservationCount === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <CalendarDays className="w-10 h-10 mb-3 opacity-30" />
                <p className="text-sm">Bekleyen rezervasyon bulunmuyor</p>
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {recentReservations
                  .filter((r) => r.status === "pending")
                  .slice(0, 5)
                  .map((res) => (
                    <div key={res.id} className="flex items-center justify-between px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{res.customerName}</p>
                        <p className="text-xs text-muted-foreground">{res.hotel.name}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full font-medium bg-amber-50 text-amber-600">
                        Bekliyor
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-base font-semibold">Son İşlemler</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {recentReservations.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Henüz işlem yok
              </p>
            ) : (
              <div className="space-y-5">
                {recentReservations.map((res) => {
                  const statusInfo = statusLabels[res.status] ?? statusLabels.pending;
                  return (
                    <div key={res.id} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {res.reservationNo}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {res.hotel.name}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
