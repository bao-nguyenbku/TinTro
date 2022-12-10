import { Controller, UseGuards } from '@nestjs/common';
import { Body, Get, Param, Post } from '@nestjs/common/decorators';
import { ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { UsersService } from '~/users/users.service';
import { UtilsService } from '~/utils/utils.service';
import { AdminAccommodationService } from './admin-accommodation.service';

@Controller('admin-accommodation')
export class AdminAccommodationController {
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
        @Body() newRoom:{
            roomNumber: number,
            personNumber: number,
            price: number,
            utility: string 
        }
    ) {         
        return this.adminAccommodationService.createNewRoom(parseInt(adminId), newRoom);
    }
    
}
