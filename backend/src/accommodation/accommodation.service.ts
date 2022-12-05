import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccommodationResponseDto } from './dto/accommodation.dto';
import { RequestRentRoomDto } from './dto/request-rent-room.dto';

@Injectable()
export class AccommodationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllAccommodation(): Promise<AccommodationResponseDto[]> {
    try {
      return await this.prismaService.accommodation.findMany({
        include: {
          review: true,
          owner: true,
          rooms: true,
          rentRequest: true,
        },
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
          owner: true,
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
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createRequestRentRoom(data: RequestRentRoomDto) {
    const { accommodationId, renterId, ownerId } = data;
    try {
      const result = await this.prismaService.rentRequest.create({
        data: {
          status: 'WAITING',
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
}
