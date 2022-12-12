import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { ServiceStatus } from '@prisma/client';

@Injectable()
export class WifiService {
  constructor(private readonly prismaService: PrismaService) {}
  // async registerWifi(registerData) {
  //   const { name, roomId } = registerData;
  //   try {
  //     return await this.prismaService.wifi.create({
  //       data: {
  //         speed: registerData.speed,
  //         password: registerData.password,
  //         roomId,
  //         purchaseStatus: ServiceStatus.PURCHASED,
  //         name: `WIFI PHÒNG ${name}`,
  //       },
  //     });
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}
