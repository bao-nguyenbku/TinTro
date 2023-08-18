import { Module } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { WifiController } from './wifi.controller';
import { WifiService } from './wifi.service';

@Module({
  controllers: [WifiController],
  providers: [WifiService, PrismaService],
})
export class WifiModule {}
