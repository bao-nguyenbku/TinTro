import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from 'src/auth/role.decorator';
import { AccommodationService } from './accommodation.service';
import { Role } from '@prisma/client';

@Controller('accommodations')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  @Get()
  @Roles(Role.USER)
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

  @Post()
  async requestRentRoom (@Body() requestRentRoomDto: RequestRentRoomDto) {

  }
}
