// Termal otelleri filtreleyen kullanım senaryosu
import { Hotel } from '../../../domain/entities/hotel.entity';
import { IHotelRepository } from '../../repositories/hotel.repository.interface';

export class GetThermalHotelsUseCase {
  constructor(private hotelRepository: IHotelRepository) {}

  async execute(): Promise<Hotel[]> {
    return this.hotelRepository.findThermal();
  }
}
