import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { hotelsData } from '../src/infrastructure/data/mock/hotels-data';
import { blogPostsData } from '../src/infrastructure/data/mock/blog-posts-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Veritabanı sıfırlanıyor ve örnek veriler yükleniyor...');

  // Mevcut verileri temizle
  await prisma.reservation.deleteMany();
  await prisma.room.deleteMany();
  await prisma.detailedFeature.deleteMany();
  await prisma.hotelFeature.deleteMany();
  await prisma.hotelTag.deleteMany();
  await prisma.hotelImage.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.blogSection.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.user.deleteMany();

  // Admin şifresini bcrypt ile hashle (salt rounds: 12)
  const hashedPassword = await hash('trabzon2024!', 12);

  // Admin kullanıcısı oluştur
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@trabzonotelleri.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  // Otelleri Ekle
  for (const hotel of hotelsData) {
    const createdHotel = await prisma.hotel.create({
      data: {
        name: hotel.name,
        slug: hotel.slug,
        location: hotel.location,
        rating: hotel.rating,
        reviews: hotel.reviews,
        price: hotel.price,
        image: hotel.image,
        hasThermal: hotel.hasThermal,
        description: hotel.description,
        
        // İlişkili veriler
        images: {
          create: hotel.images.map((url) => ({ url })),
        },
        tags: {
          create: hotel.tags.map((name) => ({ name })),
        },
        features: {
          create: hotel.features.map((name) => ({ name })),
        },
        detailedFeatures: {
          create: hotel.detailedFeatures.map((f) => ({
            icon: f.icon,
            text: f.text,
          })),
        },
        rooms: {
          create: hotel.rooms.map((r) => ({
            name: r.name,
            price: r.price,
            capacity: r.capacity,
            bed: r.bed,
          })),
        },
      },
    });

    // Her otel için örnek bir rezervasyon ekle
    await prisma.reservation.create({
      data: {
        reservationNo: `RES-${1000 + createdHotel.id}`,
        customerName: 'Örnek Müşteri',
        customerEmail: 'musteri@ornek.com',
        customerPhone: '05555555555',
        checkIn: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 gün sonra
        checkOut: new Date(new Date().setDate(new Date().getDate() + 10)), // 10 gün sonra
        adults: 2,
        children: 0,
        totalAmount: createdHotel.price * 5,
        status: 'approved',
        hotelId: createdHotel.id,
      },
    });
  }

  // Blog Yazılarını Ekle
  for (const post of blogPostsData) {
    await prisma.blogPost.create({
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        category: post.category,
        image: post.image,
        date: post.date,
        readTime: post.readTime,
        content: {
          create: post.content.map((c) => ({
            heading: c.heading,
            text: c.text,
          })),
        },
      },
    });
  }

  console.log('Tüm örnek veriler başarıyla eklendi! 🎉');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
