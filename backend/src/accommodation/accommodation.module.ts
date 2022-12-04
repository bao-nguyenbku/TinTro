import { Module } from '@nestjs/common';
import { AccommodationController } from './accommodation.controller';
import { Accommodation } from './accommodation';
import { AccommodationService } from './accommodation.service';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from '~/utils/utils.service';

@Module({
  controllers: [AccommodationController],
  providers: [Accommodation, AccommodationService, PrismaService, UtilsService],
})
export class AccommodationModule {}
