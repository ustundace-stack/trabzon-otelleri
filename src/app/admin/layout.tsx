import Link from "next/link";
import { LogOut, Bell } from "lucide-react";
import { SidebarNav } from "@/components/shared/SidebarNav";
import { getSessionUser } from "@/lib/auth";

export const metadata = {
  title: "Yönetim Paneli | Trabzon Otelleri",
  description: "Trabzon Otelleri yönetim ve rezervasyon sistemi.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Oturum kullanıcı bilgisini sunucu tarafında al
  const user = await getSessionUser();

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <Link href="/admin" className="text-xl font-bold text-white tracking-tight">
            Trabzon<span className="text-amber-400">Admin</span>
          </Link>
        </div>

        {/* Aktif link vurgulu navigasyon — ikon listesi client bileşen içinde */}
        <SidebarNav />

        <div className="p-4 border-t border-slate-800">
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Çıkış Yap</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Ana İçerik */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Üst Başlık */}
        <header className="h-20 bg-white border-b border-border/50 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="font-semibold text-lg text-foreground">Yönetim Paneli</div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
            <div className="flex items-center gap-3 border-l border-border/50 pl-6">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {user?.email?.charAt(0)?.toUpperCase() ?? "A"}
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground leading-none">
                  {user?.role === "admin" ? "Yönetici" : "Kullanıcı"}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">{user?.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Sayfa İçeriği */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
