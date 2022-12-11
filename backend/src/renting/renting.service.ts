import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, RentingStatus } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';
import { RequestCheckoutRoomDto } from '~/accommodation/dto/request-checkout-room.dto';

@Injectable()
export class RentingService {
  constructor(private readonly prismaService: PrismaService) {}
  async getRentingInfoByRenter(renterId: number) {
    try {
      return await this.prismaService.renting.findUnique({
        where: {
          renterId,
        },
        include: {
          room: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error);
        throw new HttpException('Error message', HttpStatus.NOT_FOUND);
      }
    }
  }
  async createRequestCheckoutRoom(rentingId: number) {
    try {
      const prismaResult = await this.prismaService.renting.update({
        where: {
          id: rentingId,
        },
        data: {
          status: RentingStatus.CHECKOUT,
        },
      });
      return prismaResult;
    } catch (error) {
      // TODO: Handling error here
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == 'P2025') {
          throw new HttpException(
            'Can not found renting data',
            HttpStatus.NOT_FOUND,
          );
        }
      }
    }
  }
}
