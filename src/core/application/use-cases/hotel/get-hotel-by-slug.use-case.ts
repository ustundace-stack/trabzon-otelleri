// Slug'a göre otel bulan kullanım senaryosu
import { Hotel } from '../../../domain/entities/hotel.entity';
import { IHotelRepository } from '../../repositories/hotel.repository.interface';

export class GetHotelBySlugUseCase {
  constructor(private hotelRepository: IHotelRepository) {}

  async execute(slug: string): Promise<Hotel | null> {
    return this.hotelRepository.findBySlug(slug);
  }
}
