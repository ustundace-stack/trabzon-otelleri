// Otel repository soyut arayüzü — Application Layer (Dependency Inversion)
// Üst katmanlar bu arayüze bağımlıdır; somut implementasyon Infrastructure katmanındadır.

import { Hotel } from '../../domain/entities/hotel.entity';

// Otel filtreleme parametreleri — Use Case ve Repository arasındaki sözleşme
export interface HotelFilterParams {
  search?: string;
  locations?: string[];
  minPrice?: number;
  maxPrice?: number;
  hasThermal?: boolean;
  tags?: string[];
  sortBy?: 'recommended' | 'price_asc' | 'price_desc' | 'rating_desc';
}

export interface IHotelRepository {
  findAll(): Promise<Hotel[]>;
  findBySlug(slug: string): Promise<Hotel | null>;
  findThermal(): Promise<Hotel[]>;
  findByFilter(params: HotelFilterParams): Promise<Hotel[]>;
}
