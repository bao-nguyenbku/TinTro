import { Controller, UseGuards } from '@nestjs/common';
import { Body, Get, Param, Post, Query } from '@nestjs/common/decorators';
import { ApiOkResponse } from '@nestjs/swagger';
import { Accommodation } from '~/accommodation/accommodation';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { UsersService } from '~/users/users.service';
import { UtilsService } from '~/utils/utils.service';
import { AdminAccommodationService } from './admin-accommodation.service';

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
    @Post(':id/new')
    async newRoom(
        @Param('id') adminId: string,
        @Query('accomId') accomId,
        @Body() newRoom:{
            roomNumber: number,
            personNumber: number,
            price: number,
            utility: string 
        }
    ) {        
        
        const result = await this.adminAccommodationService.createRoom(parseInt(adminId),parseInt(accomId),newRoom);
        return result;
    }
    
}
