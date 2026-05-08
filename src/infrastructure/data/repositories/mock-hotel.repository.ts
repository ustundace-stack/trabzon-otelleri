// Mock otel repository implementasyonu — Infrastructure Data Layer
// IHotelRepository arayüzünü uygular; veriyi mock datadan sağlar.

import { Hotel } from '../../../core/domain/entities/hotel.entity';
import { IHotelRepository, HotelFilterParams } from '../../../core/application/repositories/hotel.repository.interface';
import { hotelsData } from '../mock/hotels-data';

export class MockHotelRepository implements IHotelRepository {
  async findAll(): Promise<Hotel[]> {
    return hotelsData;
  }

  async findBySlug(slug: string): Promise<Hotel | null> {
    return hotelsData.find((h) => h.slug === slug) ?? null;
  }

  async findThermal(): Promise<Hotel[]> {
    return hotelsData.filter((h) => h.hasThermal);
  }

  async findByFilter(params: HotelFilterParams): Promise<Hotel[]> {
    // Mock için bellek içi filtreleme
    let result = [...hotelsData];
    if (params.hasThermal !== undefined) result = result.filter((h) => h.hasThermal === params.hasThermal);
    if (params.search) {
      const q = params.search.toLowerCase();
      result = result.filter((h) =>
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q) ||
        h.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (params.minPrice !== undefined) result = result.filter((h) => h.price >= params.minPrice!);
    if (params.maxPrice !== undefined) result = result.filter((h) => h.price <= params.maxPrice!);
    // Tag bazlı filtreleme — eşleşen en az bir tag içeren oteller
    if (params.tags && params.tags.length > 0) {
      result = result.filter((h) =>
        params.tags!.some((tag) => h.tags.includes(tag))
      );
    }
    // Sıralama
    if (params.sortBy === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (params.sortBy === 'price_desc') result.sort((a, b) => b.price - a.price);
    else if (params.sortBy === 'rating_desc') result.sort((a, b) => b.rating - a.rating);
    return result;
  }
}
