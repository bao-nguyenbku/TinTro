import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class ParkingService {
  constructor(private readonly prismaService: PrismaService) {}
  async getParkingInfo(renterId: number) {
    try {
      return await this.prismaService.parking.findUnique({
        where: {
          renterId,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteParking(parkingId: number) {
    try {
      return await this.prismaService.parking.delete({
        where: {
          id: parkingId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException('Unknown', HttpStatus.BAD_REQUEST);
      }
    }
  }
  async registerParking(createData) {
    try {
      const result = await this.prismaService.parking.create({
        data: {
          ...createData,
          price: 50000,
        },
      });
      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error);
        if (error.code === 'P2003') {
          throw new HttpException(
            'Error on key constraint',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (error.code === 'P2002') {
          throw new HttpException(
            'Error on key constraint',
            HttpStatus.BAD_REQUEST,
          );
        }
        throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
