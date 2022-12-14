import { updateRoomDto } from './dto/updateRoomDto.dto';
import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
    try {
      return this.adminAccommodationService.getAllAdminAccommodation(
        parseInt(req.user.id),
      );
    } catch (err) {
      throw err;
    }
  }

  @Post('room')
  @UseGuards(JwtAuthGuard)
  async newRoom(@Req() req, @Body() newRoom: RoomDto) {
    try {
      const result = await this.adminAccommodationService.createRoom(
        parseInt(req.user.id),
        newRoom,
      );
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Put('room/:id')
  @UseGuards(JwtAuthGuard)
  async modifyRoom(@Param('id') roomId, @Body() modifyRoom: updateRoomDto) {
    try {
      const result = await this.adminAccommodationService.modifyRoom(
        parseInt(roomId),
        modifyRoom,
      );
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Delete('room/:id')
  @UseGuards(JwtAuthGuard)
  async deleteRoom(@Param('id') roomId) {
    try {
      return await this.adminAccommodationService.deleteRoom(parseInt(roomId));
    } catch (err) {
      throw err;
    }
  }

  @Put('room/assign/:roomId/:renterId')
  @UseGuards(JwtAuthGuard)
  async addRenterToRoom(
    @Request() req,
    @Param('roomId') roomId: string,
    @Param('renterId') renterId: string,
  ) {
    try {
      await this.adminAccommodationService.addRenterToRoom(
        parseInt(req.user.id),
        parseInt(roomId),
        parseInt(renterId),
      );
    } catch (err) {
      throw err;
    }
  }

  @Delete('/rent-requests/:id')
  @UseGuards(JwtAuthGuard)
  async deleteRentRequest(@Param('id') requestId: string) {
    try {
      return await this.adminAccommodationService.deleteRentRequestById(
        parseInt(requestId),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('rent-requests/all')
  @UseGuards(JwtAuthGuard)
  async getAllRentRequest(@Req() req) {
    try {
      return await this.adminAccommodationService.getAllRentRequest(
        parseInt(req.user.id),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id/accept-rent-request')
  @UseGuards(JwtAuthGuard)
  async acceptRequest(@Param('id') requestId: string) {
    return await this.adminAccommodationService.acceptRequest(
      parseInt(requestId),
    );
  }

  @Get(':id/get-all-rooms')
  @UseGuards(JwtAuthGuard)
  async getAllRooms(@Param('id') adminId: string) {
    return await this.adminAccommodationService.getAllRooms(parseInt(adminId));
  }
}
