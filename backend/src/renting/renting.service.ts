import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, RentingStatus, Role, RoomStatus } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';
// import { RequestCheckoutRoomDto } from '~/accommodation/dto/request-checkout-room.dto';

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
          requestRole: Role.USER,
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
  async ownerRequestCheckout(data: any) {
    const { renterId } = data;
    try {
      return await this.prismaService.renting.update({
        where: {
          renterId,
        },
        data: {
          status: RentingStatus.CHECKOUT,
          requestRole: Role.ADMIN,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllCheckoutRequest() {
    try {
      const prismaResult = await this.prismaService.renting.findMany({
        where: {
          status: RentingStatus.CHECKOUT,
        },
        include: {
          room: true,
          renter: {
            include: {
              user: true,
            },
          },
        },
      });
      return prismaResult.map((item) => {
        delete item.renterId;
        delete item.roomId;
        return {
          ...item,
          renter: {
            ...item.renter.user,
          },
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllRenterByRoomId(roomId: number) {
    try {
      const prismaResult = await this.prismaService.renting.findMany({
        where: {
          roomId,
        },
        include: {
          renter: {
            include: {
              user: true,
            },
          },
        },
      });
      return prismaResult.map((item) => {
        return {
          ...item,
          renter: item.renter.user,
        };
      });
    } catch (error) {
      throw new Error(error.message || 'Unknown error');
    }
  }
  async cancelRequestCheckoutRoom(rentingId: number, role: string) {
    try {
      const prismaResult = await this.prismaService.renting.update({
        where: {
          id: rentingId,
        },
        data: {
          status: RentingStatus.RENTING,
          requestRole: role === Role.ADMIN ? Role.USER : Role.ADMIN,
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
  async acceptCheckoutRoom(rentingId: number) {
    try {
      return await this.prismaService.renting.delete({
        where: {
          id: rentingId,
        },
      });
    } catch (error) {
      throw new Error(error.message || 'Unknown error');
    }
  }
  async updateRoomStatus(data: { roomId: number; status: RoomStatus }) {
    const { roomId, status } = data;
    try {
      return await this.prismaService.room.update({
        where: {
          id: roomId,
        },
        data: {
          status,
        },
      });
    } catch (error) {
      throw new Error(error.mesage || 'Unknown error');
    }
  }
}
