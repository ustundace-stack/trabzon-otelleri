// Mock blog yazısı verisi — Infrastructure Data Layer
// Blog içerikleri bu dosyada merkezi olarak tutulur.

import { BlogPost } from '../../../core/domain/entities/blog-post.entity';

export const blogPostsData: BlogPost[] = [
  {
    id: 1,
    title: "Trabzon Gezi Rehberi: Mutlaka Görülmesi Gereken 10 Yer",
    slug: "trabzon-gezi-rehberi-mutlaka-gorulmesi-gereken-10-yer",
    excerpt: "Sümela Manastırı'ndan Uzungöl'e, Trabzon'un tarihi ve doğal güzelliklerini keşfetmek için eksiksiz bir rehber.",
    category: "Gezi Rehberi",
    image: "https://images.unsplash.com/photo-1542314831-c6a4d27ce6a2?q=80&w=800&auto=format&fit=crop",
    date: "12 Mayıs 2024",
    readTime: "8 dk okuma",
    content: [
      {
        heading: "1. Sümela Manastırı",
        text: "Trabzon'un simgesi haline gelen Sümela Manastırı, dik kayalıkların üzerine inşa edilmiş görkemli yapısıyla ziyaretçileri büyüler. MS 386 yılında kurulan bu tarihi yapı, hem dini hem de mimari açıdan son derece önem taşımaktadır.",
      },
      {
        heading: "2. Uzungöl",
        text: "Trabzon'a bağlı Çaykara ilçesinde bulunan Uzungöl, göl, dağ ve orman bütünlüğüyle eşsiz bir doğa harikasıdır. Her mevsim farklı bir güzellik sunan Uzungöl, özellikle sonbahar aylarında rengarenk yapraklarıyla büyüleyici bir manzara oluşturur.",
      },
      {
        heading: "3. Ayasofya Müzesi",
        text: "İstanbul'daki Ayasofya'dan farklı olarak Trabzon Ayasofyası, 13. yüzyılda inşa edilmiş Bizans dönemine ait bir şaheserdir. Özgün fresklerini koruyan bu yapı, hem tarihi hem de sanatsal değeri nedeniyle mutlaka ziyaret edilmesi gereken bir yerdir.",
      },
      {
        heading: "4. Boztepe Seyir Terası",
        text: "Trabzon şehir merkezine hakim tepede bulunan Boztepe, şehrin ve Karadeniz'in nefes kesen panoramik manzarasını sunar. Özellikle gün batımında buradan izlenecek manzara unutulmaz bir deneyim yaratır.",
      },
    ],
  },
  {
    id: 2,
    title: "Termal Suyun Faydaları ve Trabzon Termal Otelleri",
    slug: "termal-suyun-faydalari-ve-trabzon-termal-otelleri",
    excerpt: "Doğal termal suyun insan sağlığına faydaları ve Trabzon çevresinde tercih edebileceğiniz en iyi termal tesisler.",
    category: "Sağlık & Yaşam",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    date: "05 Mayıs 2024",
    readTime: "6 dk okuma",
    content: [
      {
        heading: "Termal Suyun Faydaları",
        text: "Termal sular, mineral içerikleri sayesinde eklem ağrıları, cilt hastalıkları ve dolaşım sorunlarına olumlu etki etmektedir. Düzenli termal kür uygulamaları, stres azaltma ve genel beden dinlenmesi açısından da büyük yarar sağlar.",
      },
      {
        heading: "Trabzon'da Termal Turizm",
        text: "Trabzon ve çevre illeri, doğal termal kaynaklar bakımından oldukça zengindir. Ayder Yaylası başta olmak üzere bölge, termal turizm açısından giderek daha fazla tercih edilmektedir.",
      },
    ],
  },
  {
    id: 3,
    title: "Trabzon Yöresel Lezzetleri: Ne Yenir, Nerede Yenir?",
    slug: "trabzon-yoresel-lezzetleri-ne-yenir-nerede-yenir",
    excerpt: "Akçaabat köftesinden kuymak lezzetine kadar Trabzon mutfağının en seçkin tatları ve mekan önerileri.",
    category: "Lezzet Rehberi",
    image: "https://images.unsplash.com/photo-1560067174-c5a3a8f37060?q=80&w=800&auto=format&fit=crop",
    date: "28 Nisan 2024",
    readTime: "5 dk okuma",
    content: [
      {
        heading: "Akçaabat Köftesi",
        text: "Trabzon'un en ünlü lezzeti olan Akçaabat köftesi, katkısız saf sığır etinden hazırlanır ve kendine özgü hazırlama tekniğiyle eşsiz bir tat sunar. Şehir merkezindeki tarihi köftecilerde orijinal lezzetini tatmak mümkündür.",
      },
      {
        heading: "Kuymak",
        text: "Mısır unu ve tereyağıyla hazırlanan kuymak, içine peynir eklenerek servis edilir. Özellikle sabah kahvaltısında çay eşliğinde sunulan bu Karadeniz lezzeti mutlaka denenmelidir.",
      },
    ],
  },
  {
    id: 4,
    title: "Uzungöl Otelleri: Doğayla İç İçe Bir Tatil",
    slug: "uzungol-otelleri-dogayla-ic-ice-bir-tatil",
    excerpt: "Trabzon'un en popüler turistik noktası Uzungöl'de konaklamak için en iyi seçenekler ve dikkat edilmesi gerekenler.",
    category: "Otel İncelemeleri",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    date: "20 Nisan 2024",
    readTime: "7 dk okuma",
    content: [
      {
        heading: "Uzungöl'de Konaklama",
        text: "Gölün etrafını saran küçük oteller ve bungalovlar, misafirlerine eşsiz bir doğa manzarası sunar. Erken rezervasyon yaptırmak, özellikle yaz aylarında yer bulmayı kolaylaştırır.",
      },
    ],
  },
  {
    id: 5,
    title: "Trabzon'da Aile Tatili: Çocuklarla Gezilecek Yerler",
    slug: "trabzonda-aile-tatili-cocuklarla-gezilecek-yerler",
    excerpt: "Ailecek yapacağınız Karadeniz turunda çocuklarınızın da keyif alabileceği rotalar ve aktivite önerileri.",
    category: "Aile Seyahati",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    date: "15 Nisan 2024",
    readTime: "6 dk okuma",
    content: [
      {
        heading: "Aile Dostu Aktiviteler",
        text: "Trabzon, çocuklu aileler için birçok aktivite seçeneği sunar. Uzungöl'deki at turları, Sümela Manastırı ziyareti ve Boztepe seyir terası, ailenin her yaştan üyesine hitap eden deneyimler arasındadır.",
      },
    ],
  },
  {
    id: 6,
    title: "Trabzon'da Hafta Sonu Kaçamağı Rotaları",
    slug: "trabzonda-hafta-sonu-kacamagi-rotalari",
    excerpt: "Kısa bir tatil arayanlar için sadece iki günde Trabzon'un ruhunu hissedebileceğiniz hızlı ve etkili rota planı.",
    category: "Seyahat İpuçları",
    image: "https://images.unsplash.com/photo-1596484552834-6a58f850b0cc?q=80&w=800&auto=format&fit=crop",
    date: "10 Nisan 2024",
    readTime: "4 dk okuma",
    content: [
      {
        heading: "1. Gün: Şehir Merkezi",
        text: "İlk gününüzü Trabzon şehir merkezine ayırın. Ayasofya, tarihi bazaar ve Boztepe seyir terasını gezerek şehrin ruhunu hissedin.",
      },
      {
        heading: "2. Gün: Uzungöl",
        text: "İkinci günün tamamını Uzungöl'e ayırın. Sabah erken çıkın, gölün etrafında yürüyüş yapın ve öğlen yemeğinizi yöresel bir restoranda yiyin.",
      },
    ],
  },
];
