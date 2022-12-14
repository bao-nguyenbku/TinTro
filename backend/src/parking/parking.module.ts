import { Module } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService, PrismaService],
})
export class ParkingModule {}
