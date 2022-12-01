import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AccommodationService } from './accommodation.service';

@Controller('accommodations')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllAccommodation() {
    try {
      const result = await this.accommodationService.getAllAccommodation();
      return result.map((item) => ({
        ...item,
        reviewStar: Math.round(Math.random() * 5),
      }));
    } catch (error) {
      throw new Error(error);
    }
  }
}
