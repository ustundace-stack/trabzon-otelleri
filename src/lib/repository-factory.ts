// Repository Singleton Factory — Dependency Injection tutarlılığı
// DATABASE_URL tanımlıysa PrismaRepository, değilse MockRepository kullanılır.
// Bu sayede Vercel build'i veritabanı olmadan da başarıyla tamamlanır.

import { IHotelRepository } from '@/core/application/repositories/hotel.repository.interface';
import { IBlogPostRepository } from '@/core/application/repositories/blog-post.repository.interface';

function createHotelRepository(): IHotelRepository {
  if (process.env.DATABASE_URL) {
    const { PrismaHotelRepository } = require('@/infrastructure/data/repositories/prisma-hotel.repository');
    return new PrismaHotelRepository();
  }
  const { MockHotelRepository } = require('@/infrastructure/data/repositories/mock-hotel.repository');
  return new MockHotelRepository();
}

function createBlogPostRepository(): IBlogPostRepository {
  if (process.env.DATABASE_URL) {
    const { PrismaBlogPostRepository } = require('@/infrastructure/data/repositories/prisma-blog-post.repository');
    return new PrismaBlogPostRepository();
  }
  const { MockBlogPostRepository } = require('@/infrastructure/data/repositories/mock-blog-post.repository');
  return new MockBlogPostRepository();
}

// Uygulama genelinde kullanılan singleton repository'ler
export const hotelRepository = createHotelRepository();
export const blogPostRepository = createBlogPostRepository();

