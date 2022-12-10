import { Controller, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { UsersService } from '~/users/users.service';
import { UtilsService } from '~/utils/utils.service';
import { AdminAccommodationService } from './admin-accommodation.service';

@Controller('admin-accommodation')
export class AdminAccommodationController {
    constructor(
        private readonly adminAccommodationService: AdminAccommodationService,
        private readonly utilsService: UtilsService,
        private readonly userService: UsersService,
    ) {}
    
    
}
