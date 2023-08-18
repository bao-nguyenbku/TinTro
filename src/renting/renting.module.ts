import { Module } from '@nestjs/common';
import { RentingService } from './renting.service';
import { PrismaService } from '~/prisma/prisma.service';
import { RentingController } from './renting.controller';
@Module({
  controllers: [RentingController],
  providers: [RentingService, PrismaService],
})
export class RentingModule {}
