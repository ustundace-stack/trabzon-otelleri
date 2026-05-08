// Filtrelenmiş otel listesi döndüren kullanım senaryosu
import { Hotel } from '../../../domain/entities/hotel.entity';
import { IHotelRepository, HotelFilterParams } from '../../repositories/hotel.repository.interface';

export class GetFilteredHotelsUseCase {
  constructor(private hotelRepository: IHotelRepository) {}

  async execute(params: HotelFilterParams): Promise<Hotel[]> {
    return this.hotelRepository.findByFilter(params);
  }
}
