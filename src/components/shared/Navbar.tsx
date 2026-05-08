import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Oteller", href: "/oteller" },
  { name: "Termal Oteller", href: "/oteller/termal" },
  { name: "Gezi Rehberi", href: "/blog" },
  { name: "İletişim", href: "/iletisim" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-2xl font-bold tracking-tight text-primary">
            Trabzon <span className="text-accent">Otelleri</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
            Hemen Teklif Al
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger>
              <div className={buttonVariants({ variant: "ghost", size: "icon", className: "h-10 w-10 cursor-pointer" })}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menüyü Aç</span>
              </div>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-4">
                  <Button className="w-full bg-primary text-primary-foreground">Hemen Teklif Al</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
