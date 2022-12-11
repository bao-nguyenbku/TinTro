import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Accommodation } from '~/accommodation/accommodation';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { UsersService } from '~/users/users.service';
import { UtilsService } from '~/utils/utils.service';
import { AdminAccommodationService } from './admin-accommodation.service';
import { RoomDto } from './dto/room.dto';

@Controller('admin-accommodation')
export class AdminAccommodationController {
  AccommodationService: any;
  usersService: any;
  constructor(
    private readonly adminAccommodationService: AdminAccommodationService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get('/get-all-room')
  async findAll(@Request() req) {
    const ownerId = req.user.id;
    return this.adminAccommodationService.getAllRooms(ownerId);
  }

  @Get('/rooms/:id/renter/all')
  async getAllRenterByRoom(@Param('id') id: string) {
    return await this.adminAccommodationService.getRenterByRoom(parseInt(id));
  }
  @Post(':id/new-room')
  async newRoom(@Param('id') adminId: string, @Body() newRoom: RoomDto) {
    const result = await this.adminAccommodationService.createRoom(
      parseInt(adminId),
      newRoom,
    );
    return result;
  }

  @Put(':id/modify-room')
  async modifyRoom(
    @Param('id') adminId: string,
    @Query('roomId') roomId,
    @Body() modifyRoom: RoomDto,
  ) {
    const result = await this.adminAccommodationService.modifyRoom(
      parseInt(roomId),
      modifyRoom,
    );
    return result;
  }

  @Delete(':id/delete-room')
  async deleteRoom(@Param('id') adminId: string, @Query('roomId') roomId) {
    return await this.adminAccommodationService.deleteRoom(parseInt(roomId));
  }

  @Get(':id/all-rent-request')
  async getAllRentRequest(@Param('id') adminId: string) {
    return await this.adminAccommodationService.getAllRentRequest(
      parseInt(adminId),
    );
  }

  @Put(':id/accept-rent-request')
  async acceptRequest(@Param('id') requestId: string) {
    return await this.adminAccommodationService.acceptRequest(
      parseInt(requestId),
    );
  }

  @Post(':id/add-renter-to-room')
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
  async getAllRooms(@Param('id') adminId: string) {
    return await this.adminAccommodationService.getAllRooms(parseInt(adminId));
  }
}
