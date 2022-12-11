import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { Roles } from '~/auth/role.decorator';
import { RentingService } from './renting.service';
import { Role } from '@prisma/client';
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
  @Get('/all')
  async getAllCheckoutRequestRoom() {
    return this.rentingService.getAllCheckoutRequest();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id/checkout')
  async requestCheckoutRoom(@Param('id') rentingId: string) {
    const result = await this.rentingService.createRequestCheckoutRoom(
      parseInt(rentingId),
    );
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/owner-checkout')
  async ownerRequestCheckout(@Param('id') rentingId: string, @Request() req) {
    if (req.user.role === 'ADMIN') {
      const ownerId = req.user.id;
      const result = await this.rentingService.ownerRequestCheckout(
        parseInt(rentingId),
      );
      return result;
    }
    throw new HttpException(
      'This user can not operate this action',
      HttpStatus.FORBIDDEN,
    );
  }
}
