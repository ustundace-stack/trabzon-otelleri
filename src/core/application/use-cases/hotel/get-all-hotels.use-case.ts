// Tüm otelleri getiren kullanım senaryosu
import { Hotel } from '../../../domain/entities/hotel.entity';
import { IHotelRepository } from '../../repositories/hotel.repository.interface';

export class GetAllHotelsUseCase {
  constructor(private hotelRepository: IHotelRepository) {}

  async execute(): Promise<Hotel[]> {
    return this.hotelRepository.findAll();
  }
}
