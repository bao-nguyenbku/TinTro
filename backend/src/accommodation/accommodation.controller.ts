import { Controller, Get } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';

@Controller('accommodations')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  @Get()
  async getAllAccommodation() {
    try {
      return await this.accommodationService.getAllAccommodation();
    } catch (error) {
      throw new Error(error);
    }
  }
}
