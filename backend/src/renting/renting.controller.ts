import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { RentingService } from './renting.service';
// import { RequestCheckoutRoomDto } from './dto/request-checkout-room.dto';

@Controller('renting')
export class RentingController {
  constructor(private readonly rentingService: RentingService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getRentingInfoByRenter(@Request() req) {
    const renterId = req.user.id;
    return await this.rentingService.getRentingInfoByRenter(renterId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/checkout')
  async requestCheckoutRoom(@Param('id') rentingId: string, @Request() req) {
    const result = await this.rentingService.createRequestCheckoutRoom(
      parseInt(rentingId),
    );
    return result;
  }
}
