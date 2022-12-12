import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common/decorators';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';

import { AdminAccommodationService } from './admin-accommodation.service';
import { RoomDto } from './dto/room.dto';

@Controller('admin-accommodation')
export class AdminAccommodationController {
  AccommodationService: any;
  usersService: any;
  constructor(
    private readonly adminAccommodationService: AdminAccommodationService,
  ) {}

  @Get('my-accommodation')
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    return this.adminAccommodationService.getAllAdminAccommodation(
      parseInt(req.user.id),
    );
  }

  @Post('room')
  @UseGuards(JwtAuthGuard)
  async newRoom(@Req() req, @Body() newRoom: RoomDto) {
    const result = await this.adminAccommodationService.createRoom(
      parseInt(req.user.id),
      newRoom,
    );
    return result;
  }

  @Put('room/:id')
  @UseGuards(JwtAuthGuard)
  async modifyRoom(@Param('id') roomId, @Body() modifyRoom: RoomDto) {
    const result = await this.adminAccommodationService.modifyRoom(
      parseInt(roomId),
      modifyRoom,
    );
    return result;
  }

  @Delete('room/:id')
  @UseGuards(JwtAuthGuard)
  async deleteRoom(@Param('id') roomId) {
    return await this.adminAccommodationService.deleteRoom(parseInt(roomId));
  }

  @Get(':id/all-rent-request')
  @UseGuards(JwtAuthGuard)
  async getAllRentRequest(@Param('id') adminId: string) {
    return await this.adminAccommodationService.getAllRentRequest(
      parseInt(adminId),
    );
  }

  @Put(':id/accept-rent-request')
  @UseGuards(JwtAuthGuard)
  async acceptRequest(@Param('id') requestId: string) {
    return await this.adminAccommodationService.acceptRequest(
      parseInt(requestId),
    );
  }

  @Post(':id/add-renter-to-room')
  @UseGuards(JwtAuthGuard)
  async addRenterToRoom(
    @Param('id') adminId: string,
    @Query('roomId') roomId,
    @Query('renterId') renterId,
  ) {
    return await this.adminAccommodationService.addRenterToRoom(
      parseInt(adminId),
      parseInt(roomId),
      parseInt(renterId),
    );
  }

  @Get(':id/get-all-rooms')
  @UseGuards(JwtAuthGuard)
  async getAllRooms(@Param('id') adminId: string) {
    return await this.adminAccommodationService.getAllRooms(parseInt(adminId));
  }
}
