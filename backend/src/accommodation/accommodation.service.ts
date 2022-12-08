import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, RequestStatus, RoomStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccommodationResponseDto } from './dto/accommodation.dto';
import { RequestRentRoomDto } from './dto/request-rent-room.dto';

@Injectable()
export class AccommodationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllAccommodation(): Promise<AccommodationResponseDto[]> {
    try {
      const prismaResults = await this.prismaService.accommodation.findMany({
        include: {
          review: true,
          owner: {
            include: {
              user: true,
            },
          },
          rooms: true,
          rentRequest: true,
        },
      });
      return prismaResults.map((result) => {
        return {
          ...result,
          owner: result.owner.user,
          availableRooms: result.rooms.reduce(
            (acc, curr) =>
              curr.status === RoomStatus.AVAILABLE ? acc + 1 : acc,
            0,
          ),
          reviewStar: result?.review?.length
            ? result.review.reduce((acc, cur) => acc + cur.rating, 0) /
              result.review.length
            : 0,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAccommodationById(id: number): Promise<AccommodationResponseDto> {
    try {
      const result = await this.prismaService.accommodation.findUnique({
        where: {
          id,
        },
        include: {
          owner: {
            include: {
              user: true,
            },
          },
          rooms: true,
          rentRequest: true,
          review: true,
        },
      });
      if (!result) {
        throw new HttpException(
          'Can not find this accommodation',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        ...result,
        owner: result.owner.user,
        availableRooms: result.rooms.reduce(
          (acc, curr) => (curr.status === RoomStatus.AVAILABLE ? acc + 1 : acc),
          0,
        ),
        reviewStar: result?.review?.length
          ? result.review.reduce((acc, cur) => acc + cur.rating, 0) /
            result.review.length
          : 0,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createRequestRentRoom(data: RequestRentRoomDto) {
    const { accommodationId, renterId, ownerId } = data;
    try {
      const result = await this.prismaService.rentRequest.create({
        data: {
          status: RequestStatus.WAITING,
          owner: {
            connect: {
              userId: ownerId,
            },
          },
          accommodation: {
            connect: {
              id: accommodationId,
            },
          },
          renter: {
            connect: {
              userId: renterId,
            },
          },
        },
        include: {
          owner: true,
          accommodation: true,
          renter: true,
        },
      });
      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'Can not request rent to an accommodation with the same renter',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (error.code === 'P2025') {
          throw new HttpException(
            'Can not find this renter to make a request',
            HttpStatus.NOT_FOUND,
          );
        }
      }
    }
  }

  async getRentRequestByRenter(renterId: number) {
    try {
      const result = await this.prismaService.rentRequest.findMany({
        where: {
          renterId,
        },
      });
      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async getRecommendAccommodations() {
    try {
      const prismaResult = await this.prismaService.accommodation.findMany({
        include: {
          review: true,
          owner: {
            include: {
              user: true,
            },
          },
        },
      });
      return prismaResult.map((item) => {
        return {
          ...item,
          owner: item.owner.user,
          reviewStar: item?.review?.length
            ? item.review.reduce((acc, cur) => acc + cur.rating, 0) /
              item.review.length
            : 0,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
