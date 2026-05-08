import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Marka & Açıklama */}
          <div className="space-y-4">
            <span className="font-heading text-3xl font-bold tracking-tight text-white">
              Trabzon <span className="text-accent">Otelleri</span>
            </span>
            <p className="text-primary-foreground/80 leading-relaxed max-w-sm mt-4">
              Trabzon&apos;un eşsiz doğasını keşfedin. Lüks, termal ve butik otel seçenekleriyle en iyi konaklama deneyimini yaşayın.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-accent hover:text-primary transition-colors" aria-label="Facebook">
                <span className="font-bold">FB</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-accent hover:text-primary transition-colors" aria-label="Instagram">
                <span className="font-bold">IG</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-accent hover:text-primary transition-colors" aria-label="Twitter">
                <span className="font-bold">TW</span>
              </a>
            </div>
          </div>

          {/* Hızlı Bağlantılar */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-6 text-white relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-accent">Hızlı Bağlantılar</h3>
            <ul className="space-y-3">
              <li><Link href="/oteller" className="text-primary-foreground/80 hover:text-accent transition-colors">Tüm Oteller</Link></li>
              <li><Link href="/oteller/termal" className="text-primary-foreground/80 hover:text-accent transition-colors">Termal Oteller</Link></li>
              {/* <li><Link href="/oteller/luks" className="text-primary-foreground/80 hover:text-accent transition-colors">Lüks Oteller</Link></li> */}
              <li><Link href="/blog" className="text-primary-foreground/80 hover:text-accent transition-colors">Trabzon Gezi Rehberi</Link></li>
              {/* <li><Link href="/kampanyalar" className="text-primary-foreground/80 hover:text-accent transition-colors">Kampanyalar</Link></li> */}
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-6 text-white relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-accent">Kurumsal</h3>
            <ul className="space-y-3">
              <li><Link href="/hakkimizda" className="text-primary-foreground/80 hover:text-accent transition-colors">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="text-primary-foreground/80 hover:text-accent transition-colors">İletişim</Link></li>
              <li><Link href="/sss" className="text-primary-foreground/80 hover:text-accent transition-colors">Sık Sorulan Sorular</Link></li>
              {/* <li><Link href="/kvkk" className="text-primary-foreground/80 hover:text-accent transition-colors">KVKK Aydınlatma Metni</Link></li> */}
              {/* <li><Link href="/gizlilik" className="text-primary-foreground/80 hover:text-accent transition-colors">Gizlilik Politikası</Link></li> */}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-6 text-white relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-accent">İletişim Bilgileri</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>Trabzon Merkez, Trabzon / Türkiye</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+904620000000" className="hover:text-accent transition-colors">+90 (462) 000 00 00</a>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:info@trabzonotelleri.com" className="hover:text-accent transition-colors">info@trabzonotelleri.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Footer */}
        <div className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60 text-center md:text-left">
            &copy; {new Date().getFullYear()} Trabzon Otelleri. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
            {/* <Link href="/kullanim-sartlari" className="hover:text-white transition-colors">Kullanım Şartları</Link> */}
            {/* <Link href="/cerez-politikasi" className="hover:text-white transition-colors">Çerez Politikası</Link> */}
            <span className="opacity-60 italic">Sayfalar güncellenmektedir</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
