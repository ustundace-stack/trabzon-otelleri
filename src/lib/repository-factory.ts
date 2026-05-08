// Repository Singleton Factory — Dependency Injection tutarlılığı
// Tüm sayfalar ve use case'ler bu dosyadan import eder; her çağrıda yeni instance oluşturmaz.
import { PrismaHotelRepository } from '@/infrastructure/data/repositories/prisma-hotel.repository';
import { PrismaBlogPostRepository } from '@/infrastructure/data/repositories/prisma-blog-post.repository';

// Otel repository singleton'ı
export const hotelRepository = new PrismaHotelRepository();

// Blog yazısı repository singleton'ı
export const blogPostRepository = new PrismaBlogPostRepository();
