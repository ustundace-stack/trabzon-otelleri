// Prisma Hotel Repository — Infrastructure Layer
// Tüm tipler Prisma'nın generate ettiği tiplerle uyumlu; `any` kullanılmaz.
import { Hotel } from '../../../core/domain/entities/hotel.entity';
import { IHotelRepository, HotelFilterParams } from '../../../core/application/repositories/hotel.repository.interface';
import { prisma } from '../../../lib/prisma';
import { Prisma } from '@prisma/client';

// Prisma sorgu sonuç tipi — type safety için `any` yerine kullanılır
type HotelWithRelations = Prisma.HotelGetPayload<{
  include: {
    images: true;
    tags: true;
    features: true;
    detailedFeatures: true;
    rooms: true;
  };
}>;

// Hotel ilişkilerini dahil eden standart include nesnesi
const hotelInclude = {
  images: true,
  tags: true,
  features: true,
  detailedFeatures: true,
  rooms: true,
} as const;

export class PrismaHotelRepository implements IHotelRepository {
  async findAll(): Promise<Hotel[]> {
    const hotels = await prisma.hotel.findMany({ include: hotelInclude });
    return hotels.map(this.mapToEntity);
  }

  async findBySlug(slug: string): Promise<Hotel | null> {
    const hotel = await prisma.hotel.findUnique({
      where: { slug },
      include: hotelInclude,
    });
    if (!hotel) return null;
    return this.mapToEntity(hotel);
  }

  async findThermal(): Promise<Hotel[]> {
    const hotels = await prisma.hotel.findMany({
      where: { hasThermal: true },
      include: hotelInclude,
    });
    return hotels.map(this.mapToEntity);
  }

  async findByFilter(params: HotelFilterParams): Promise<Hotel[]> {
    // Dinamik Prisma where koşulu — yalnızca tanımlı parametreler eklenir
    const where: Prisma.HotelWhereInput = {};

    if (params.hasThermal !== undefined) {
      where.hasThermal = params.hasThermal;
    }

    if (params.search) {
      where.OR = [
        { name: { contains: params.search } },
        { location: { contains: params.search } },
      ];
    }

    if (params.locations && params.locations.length > 0) {
      where.location = { in: params.locations };
    }

    if (params.minPrice !== undefined || params.maxPrice !== undefined) {
      where.price = {};
      if (params.minPrice !== undefined) where.price.gte = params.minPrice;
      if (params.maxPrice !== undefined) where.price.lte = params.maxPrice;
    }

    // Tag bazlı filtreleme — ilişkisel tablo üzerinden (some = en az bir eşleşme)
    if (params.tags && params.tags.length > 0) {
      where.tags = {
        some: {
          name: { in: params.tags },
        },
      };
    }

    // Sıralama stratejisi
    let orderBy: Prisma.HotelOrderByWithRelationInput = {};
    switch (params.sortBy) {
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'rating_desc':
        orderBy = { rating: 'desc' };
        break;
      default:
        orderBy = { id: 'asc' }; // Varsayılan: önerilen sıra
    }

    const hotels = await prisma.hotel.findMany({
      where,
      orderBy,
      include: hotelInclude,
    });

    return hotels.map(this.mapToEntity);
  }

  // Veritabanı modelini Domain Entity'sine dönüştüren yardımcı metod
  // Tip güvenliği için Prisma'nın generate ettiği HotelWithRelations tipi kullanılır
  private mapToEntity(dbHotel: HotelWithRelations): Hotel {
    return {
      id: dbHotel.id,
      name: dbHotel.name,
      slug: dbHotel.slug,
      location: dbHotel.location,
      rating: dbHotel.rating,
      reviews: dbHotel.reviews,
      price: dbHotel.price,
      image: dbHotel.image,
      hasThermal: dbHotel.hasThermal,
      description: dbHotel.description,
      images: dbHotel.images.map((img) => img.url),
      tags: dbHotel.tags.map((tag) => tag.name),
      features: dbHotel.features.map((feat) => feat.name),
      detailedFeatures: dbHotel.detailedFeatures.map((df) => ({
        icon: df.icon,
        text: df.text,
      })),
      rooms: dbHotel.rooms.map((room) => ({
        name: room.name,
        price: room.price,
        capacity: room.capacity,
        bed: room.bed,
      })),
    };
  }
}
