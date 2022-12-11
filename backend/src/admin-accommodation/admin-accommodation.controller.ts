import { Controller, UseGuards } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common/decorators';
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
    @Get(':id/all')
    async findAll(@Param('id') adminId: string) {        
        return this.adminAccommodationService.getAllAdminAccommodation(parseInt(adminId));
    }
    @Post(':id/new-room')
    async newRoom(
        @Param('id') adminId: string,
        @Query('accomId') accomId,
        @Body() newRoom: RoomDto,        
    ) {        
        
        const result = await this.adminAccommodationService.createRoom(parseInt(adminId),parseInt(accomId),newRoom);
        return result;
    }

    @Put(':id/modify-room')
    async modifyRoom(
        @Param('id') adminId: string,
        @Query('roomId') roomId,
        @Body() modifyRoom: RoomDto,
    ) {
        const result = await this.adminAccommodationService.modifyRoom(parseInt(roomId),modifyRoom);
        return result;
    }

    @Delete(':id/modify-room')
    async deleteRoom(
        @Param('id') adminId: string,
        @Query('roomId') roomId,
    ) {
        return await this.adminAccommodationService.deleteRoom(parseInt(roomId));
    }

    @Get(':id/all-rent-request')
    async getAllRentRequest(@Param('id') adminId: string,) {
        return this.adminAccommodationService.getAllRentRequest(parseInt(adminId))
    }

    @Put(':id/accept-rent-request')
    async acceptRequest(@Param('id') requestId: string) {
        
    }
}
