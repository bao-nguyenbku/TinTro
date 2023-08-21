import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getParkingInfo(@Request() req) {
    const renterId = req.user.id;
    return await this.parkingService.getParkingInfo(renterId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async registerParking(@Request() req, @Body() createData) {
    const renterId = req.user.id;
    return await this.parkingService.registerParking({
      renterId,
      ...createData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id/delete')
  async deleteParking(@Request() req, @Param('id') parkingId: string) {
    return await this.parkingService.deleteParking(parseInt(parkingId));
  }
}
