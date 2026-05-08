import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ReservationActionButtons } from "./ReservationActionButtons";

export const dynamic = 'force-dynamic';

const statusMap: Record<string, { label: string, className: string }> = {
  pending: { label: "Bekliyor", className: "bg-amber-50 text-amber-600 border-amber-200" },
  approved: { label: "Onaylandı", className: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  rejected: { label: "İptal Edildi", className: "bg-red-50 text-red-600 border-red-200" },
};

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    include: {
      hotel: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Rezervasyonlar</h1>
        <p className="text-muted-foreground mt-1">Müşteri rezervasyon taleplerini görüntüleyin ve yönetin.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/20">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Müşteri adı veya Rezervasyon ID..." className="pl-9 bg-white" />
          </div>
          <div className="flex gap-2">
            <select className="h-9 px-3 border border-input rounded-md text-sm bg-white">
              <option>Tüm Durumlar</option>
              <option>Bekleyenler</option>
              <option>Onaylananlar</option>
              <option>İptal Edilenler</option>
            </select>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Müşteri</TableHead>
              <TableHead>Otel</TableHead>
              <TableHead>Giriş - Çıkış</TableHead>
              <TableHead>Tutar</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((res) => (
              <TableRow key={res.id}>
                <TableCell className="font-medium text-primary">{res.reservationNo}</TableCell>
                <TableCell>{res.customerName}</TableCell>
                <TableCell>{res.hotel.name}</TableCell>
                <TableCell className="text-sm">
                  {res.checkIn.toLocaleDateString("tr-TR")} <br /> {res.checkOut.toLocaleDateString("tr-TR")}
                </TableCell>
                <TableCell className="font-semibold">₺{res.totalAmount.toLocaleString("tr-TR")}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusMap[res.status].className}>
                    {statusMap[res.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-slate-100" title="Görüntüle">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {res.status === 'pending' && (
                      <ReservationActionButtons reservationId={res.id} />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
