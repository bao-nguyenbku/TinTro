import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { Prisma, ServiceStatus } from '@prisma/client';

@Injectable()
export class WifiService {
  constructor(private readonly prismaService: PrismaService) {}
  async registerWifi(registerData) {
    console.log(registerData);
    try {
      const result = await this.prismaService.wifi.create({
        data: {
          ...registerData,
          purchaseStatus: ServiceStatus.PURCHASED,
          name: `WIFI PHÒNG ${registerData.name}`,
        },
      });
      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException('Error unknown', HttpStatus.BAD_REQUEST);
      }
      throw new Error(error);
    }
  }
  async deleteWifi(wifiId: number) {
    try {
      return await this.prismaService.wifi.delete({
        where: {
          id: wifiId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
  async getWifiInfo(roomId: number) {
    try {
      return await this.prismaService.wifi.findUnique({
        where: {
          roomId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException('Error unknown', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
