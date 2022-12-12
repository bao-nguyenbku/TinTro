import { Controller, Post, Get, Request, Body } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { WifiService } from './wifi.service';

@Controller('wifi')
export class WifiController {
  constructor(
    private readonly wifiService: WifiService,
    private readonly prismaService: PrismaService,
  ) {}
  @Post('/create')
  async registerWifi(@Request() req, @Body() data: any) {
    const { roomId } = data;
    // const existedRoom = await this.prismaService.room.findUnique({
    //   where: {
    //     id: roomId,
    //   },
    // });
    // if (existedRoom) {
    //   return await this.wifiService.registerWifi({
    //     ...data,
    //     roomId: parseInt(roomId),
    //     name: existedRoom.roomName,
    //   });
    // }
  }
}
