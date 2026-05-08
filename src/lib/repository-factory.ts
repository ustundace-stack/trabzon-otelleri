// Repository Singleton Factory — Dependency Injection tutarlılığı
// USE_MOCK_DATA=true ise MockRepository kullanılır (Vercel gibi file-DB desteklemeyen ortamlar için).
// Gerçek bir veritabanıyla çalışmak için USE_MOCK_DATA boş bırakın.

import { IHotelRepository } from '@/core/application/repositories/hotel.repository.interface';
import { IBlogPostRepository } from '@/core/application/repositories/blog-post.repository.interface';
import { MockHotelRepository } from '@/infrastructure/data/repositories/mock-hotel.repository';
import { MockBlogPostRepository } from '@/infrastructure/data/repositories/mock-blog-post.repository';

function createHotelRepository(): IHotelRepository {
  // Üretimde gerçek DB için USE_MOCK_DATA=false yapın
  if (process.env.USE_MOCK_DATA !== 'false') {
    return new MockHotelRepository();
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaHotelRepository } = require('@/infrastructure/data/repositories/prisma-hotel.repository');
  return new PrismaHotelRepository();
}

function createBlogPostRepository(): IBlogPostRepository {
  if (process.env.USE_MOCK_DATA !== 'false') {
    return new MockBlogPostRepository();
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaBlogPostRepository } = require('@/infrastructure/data/repositories/prisma-blog-post.repository');
  return new PrismaBlogPostRepository();
}

// Uygulama genelinde kullanılan singleton repository'ler
export const hotelRepository = createHotelRepository();
export const blogPostRepository = createBlogPostRepository();
