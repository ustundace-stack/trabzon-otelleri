"use client";

// Admin kenar çubuğu navigasyon linkleri — aktif rota vurgulama için client bileşen
// İkon bileşenleri bu dosyada tanımlanır (Server Component'ten non-serializable prop aktarılamaz)
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  Users,
  Settings,
} from "lucide-react";

// Sidebar linkleri ve ikonları bu client bileşende tanımlanır
const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Oteller", href: "/admin/oteller", icon: Building2 },
  { name: "Rezervasyonlar", href: "/admin/rezervasyonlar", icon: CalendarDays },
  { name: "Kullanıcılar", href: "/admin/kullanicilar", icon: Users },
  { name: "Ayarlar", href: "/admin/ayarlar", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 py-6 px-4 space-y-1">
      {sidebarLinks.map((link) => {
        const Icon = link.icon;
        // Dashboard için tam eşleşme, diğerleri için prefix eşleşmesi
        const isActive =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
              isActive
                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{link.name}</span>
            {isActive && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
