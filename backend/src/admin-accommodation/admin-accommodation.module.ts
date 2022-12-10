import { Module } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { UsersService } from '~/users/users.service';
import { UtilsService } from '~/utils/utils.service';
import { AdminAccommodationController } from './admin-accommodation.controller';
import { AdminAccommodationService } from './admin-accommodation.service';

@Module({
  controllers: [AdminAccommodationController],
  providers: [
    AdminAccommodationService,
    PrismaService,
    UtilsService,
    UsersService,
  ],
})
export class AdminAccommodationModule {}
