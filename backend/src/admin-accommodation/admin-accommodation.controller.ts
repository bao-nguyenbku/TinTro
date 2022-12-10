import { Controller, UseGuards } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common/decorators';
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
    @Get('/all')
    findAll(): string {
        return this.adminAccommodationService.getAllAdminAccommodation();
    }
    @Post('/new')
    async newAccommodation(
        @Body() newAccommodation:{
            accomNumber: number,
            personNumber: number,
            price: number,
            utility: string 
        }
    ) {
        return newAccommodation
    }
}
