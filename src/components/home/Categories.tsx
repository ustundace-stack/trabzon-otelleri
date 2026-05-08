import Image from "next/image";
import Link from "next/link";
import { Waves, Sparkles, Users, Heart, Building2, TreePine } from "lucide-react";

const categories = [
  {
    id: "termal",
    title: "Termal Oteller",
    count: 12,
    icon: Waves,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
    href: "/oteller/termal",
  },
  {
    id: "luks",
    title: "Lüks Oteller",
    count: 8,
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600&auto=format&fit=crop",
    href: "/oteller/luks",
  },
  {
    id: "aile",
    title: "Aile Dostu",
    count: 24,
    icon: Users,
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop",
    href: "/oteller/aile",
  },
  {
    id: "doga",
    title: "Doğa İçinde",
    count: 18,
    icon: TreePine,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop",
    href: "/oteller/doga",
  },
  {
    id: "butik",
    title: "Butik Oteller",
    count: 15,
    icon: Heart,
    image: "https://images.unsplash.com/photo-1560067174-c5a3a8f37060?q=80&w=600&auto=format&fit=crop",
    href: "/oteller/butik",
  },
  {
    id: "sehir",
    title: "Şehir Merkezi",
    count: 22,
    icon: Building2,
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop",
    href: "/oteller/sehir",
  },
];

export default function Categories() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">Size Uygun Tatili Seçin</h2>
          <p className="text-muted-foreground text-lg">
            İster şifalı termal sular, ister doğayla iç içe sakin bir dinlenme... Trabzon&apos;daki yüzlerce otel arasından ihtiyacınıza en uygun olanı keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl aspect-square flex flex-col items-center justify-center text-center isolate"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover absolute inset-0 -z-10 group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent -z-10" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-primary/40 transition-colors duration-300 -z-10" />
              
              <div className="relative z-10 flex flex-col items-center p-4 mt-auto w-full">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full mb-3 group-hover:bg-accent group-hover:text-primary transition-colors text-white">
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-white text-lg md:text-xl">
                  {category.title}
                </h3>
                <span className="text-white/80 text-sm mt-1">
                  {category.count} Otel
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
