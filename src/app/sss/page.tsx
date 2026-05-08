import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular | Trabzon Otelleri",
  description: "Trabzon Otelleri rezervasyon, iptal koşulları ve tesisler hakkında sıkça sorulan sorular.",
};

const faqs = [
  {
    question: "Nasıl rezervasyon yapabilirim?",
    answer: "Web sitemiz üzerinden dilediğiniz otelin detay sayfasına giderek, sağ taraftaki rezervasyon formunu doldurup talebinizi iletebilirsiniz. En kısa sürede müşteri temsilcimiz size ulaşarak rezervasyonunuzu onaylayacaktır."
  },
  {
    question: "Ödemeyi ne zaman yapacağım?",
    answer: "Ödeme işlemleri rezervasyon talebiniz onaylandıktan sonra seçtiğiniz otelin politikasına göre şekillenir. Ön ödemesiz rezervasyon seçeneklerimiz de mevcuttur."
  },
  {
    question: "Rezervasyonumu iptal edebilir miyim?",
    answer: "Evet, birçok otelimizde giriş tarihinden belirli bir süre öncesine kadar ücretsiz iptal hakkınız bulunmaktadır. İptal politikası otel detaylarında açıkça belirtilmektedir."
  },
  {
    question: "Termal otellerde aile odası bulunuyor mu?",
    answer: "Evet, Trabzon ve çevre bölgelerdeki termal otellerimizin çoğunda geniş aile odaları ve özel termal havuzlu süitler bulunmaktadır."
  },
  {
    question: "Trabzon Havalimanı'na transfer hizmetiniz var mı?",
    answer: "Anlaşmalı otellerimizin büyük bir kısmında ücretli veya ücretsiz havalimanı transfer hizmeti sunulmaktadır. Rezervasyon esnasında bu talebinizi not olarak iletebilirsiniz."
  },
  {
    question: "Fiyatlarınıza KDV dahil mi?",
    answer: "Sitemizde listelenen tüm fiyatlara KDV ve diğer vergiler dahildir. Sürpriz ek ücretlerle karşılaşmazsınız."
  }
];

export default function FAQPage() {
  return (
    <div className="bg-background min-h-screen pb-20">
      <PageHero
        title="Sık Sorulan Sorular"
        description="Aklınıza takılan soruların cevaplarını burada bulabilirsiniz."
      />

      <div className="container mx-auto px-4 lg:px-8 mt-16 max-w-4xl">
        <Accordion className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border/50 mb-4 bg-muted/20 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-lg py-6 hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
