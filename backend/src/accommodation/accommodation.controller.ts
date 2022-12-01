import { Controller, Get } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';

@Controller('accommodations')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  @Get()
  async getAllAccommodation() {
    try {
      const result = await this.accommodationService.getAllAccommodation();
      return result.map(item => ({
        ...item,
        reviewStar: Math.round(Math.random() * 5)
      }))
    } catch (error) {
      throw new Error(error);
    }
  }
}
