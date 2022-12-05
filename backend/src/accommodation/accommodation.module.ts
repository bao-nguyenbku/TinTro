import { Module } from '@nestjs/common';
import { AccommodationController } from './accommodation.controller';
import { Accommodation } from './accommodation';
import { AccommodationService } from './accommodation.service';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from '~/utils/utils.service';
import { UsersService } from '~/users/users.service';

@Module({
  controllers: [AccommodationController],
  providers: [
    Accommodation,
    AccommodationService,
    PrismaService,
    UtilsService,
    UsersService,
  ],
})
export class AccommodationModule {}
