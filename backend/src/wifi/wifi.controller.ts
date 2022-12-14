import { Controller, Post, Get, Request, Body, Param } from '@nestjs/common';
import { Delete, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { PrismaService } from '~/prisma/prisma.service';
import { WifiService } from './wifi.service';

@Controller('wifi')
export class WifiController {
  constructor(
    private readonly wifiService: WifiService,
    private readonly prismaService: PrismaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:roomId')
  async getWifiInfo(@Param('roomId') roomId: string) {
    return await this.wifiService.getWifiInfo(parseInt(roomId));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:roomId/create')
  async registerWifi(
    @Request() req,
    @Body() createData,
    @Param('roomId') roomId: string,
  ) {
    return await this.wifiService.registerWifi({
      ...createData,
      roomId: parseInt(roomId),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id/delete')
  async deleteWifi(@Param('id') wifiId: string) {
    return await this.wifiService.deleteWifi(parseInt(wifiId));
  }
}
