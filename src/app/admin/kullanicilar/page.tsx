// Admin Kullanıcı Yönetimi Sayfası — Prisma'dan gerçek kullanıcılar
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Shield, User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanıcı Yönetimi | Trabzon Admin",
  description: "Sistemdeki kullanıcıları görüntüleyin ve yönetin.",
};

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
    prisma.user.count(),
  ]);

  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Kullanıcılar</h1>
        <p className="text-muted-foreground mt-1">
          Sistemdeki tüm kullanıcıları görüntüleyin ve yönetin.
        </p>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Toplam Kullanıcı
            </CardTitle>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Yönetici Sayısı
            </CardTitle>
            <div className="p-2 bg-amber-50 rounded-lg">
              <Shield className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Kullanıcı Tablosu */}
      <Card className="border-border/50">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="text-base">Tüm Kullanıcılar</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <User className="w-10 h-10 mb-3 opacity-30" />
              <p>Henüz kullanıcı bulunmuyor.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Ad Soyad</TableHead>
                  <TableHead>E-posta</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Kayıt Tarihi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium text-muted-foreground text-xs">
                      #{user.id}
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.role === "admin"
                            ? "bg-amber-50 text-amber-600 border-amber-200"
                            : "bg-slate-50 text-slate-600 border-slate-200"
                        }
                      >
                        {user.role === "admin" ? (
                          <Shield className="w-3 h-3 mr-1" />
                        ) : (
                          <User className="w-3 h-3 mr-1" />
                        )}
                        {user.role === "admin" ? "Yönetici" : "Kullanıcı"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.createdAt.toLocaleDateString("tr-TR")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
