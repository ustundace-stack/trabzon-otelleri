import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { PrismaHotelRepository } from "@/infrastructure/data/repositories/prisma-hotel.repository";
import { GetAllHotelsUseCase } from "@/core/application/use-cases/hotel/get-all-hotels.use-case";

export default async function AdminHotelsPage() {
  const hotels = await new GetAllHotelsUseCase(new PrismaHotelRepository()).execute();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Oteller</h1>
          <p className="text-muted-foreground mt-1">Sistemdeki tüm otelleri yönetin.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Yeni Otel Ekle
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/20">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Otel adı ile ara..." className="pl-9 bg-white" />
          </div>
          <div className="text-sm text-muted-foreground">
            Toplam <strong>{hotels.length}</strong> otel
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Otel Adı</TableHead>
              <TableHead>Konum</TableHead>
              <TableHead>Fiyat (Min)</TableHead>
              <TableHead>Puan</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotels.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell className="font-medium">{hotel.name}</TableCell>
                <TableCell>{hotel.location}</TableCell>
                <TableCell>₺{hotel.price.toLocaleString("tr-TR")}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-accent">★</span> {hotel.rating}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                    Aktif
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
