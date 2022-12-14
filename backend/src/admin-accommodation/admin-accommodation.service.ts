import { RentingStatus, RequestStatus, RoomStatus } from '@prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { RoomDto } from './dto/room.dto';
import { AccommodationService } from '~/accommodation/accommodation.service';
import { updateRoomDto } from './dto/updateRoomDto.dto';

@Injectable()
export class AdminAccommodationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly accommodationService: AccommodationService,
  ) {}

  async getAllAdminAccommodation(adminId: number) {
    try {
      const result = await this.prismaService.accommodation.findFirstOrThrow({
        where: {
          ownerId: adminId,
        },
        include: {
          owner: {
            include: {
              user: true,
            },
          },
          rooms: {
            orderBy: {
              roomName: 'asc',
            },
          },
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
      throw new Error(error);
    }
  }

  async createRoom(adminId: number, newRoom: RoomDto) {
    try {
      const existedAccommodaiton =
        await this.prismaService.accommodation.findUnique({
          where: {
            ownerId: adminId,
          },
        });

      if (existedAccommodaiton.ownerId == adminId) {
        const result = await this.prismaService.room.create({
          data: {
            status: RoomStatus.AVAILABLE,
            roomName: newRoom.roomName,
            personNumber: Number(newRoom.personNumber),
            accommodationId: existedAccommodaiton.id,
          },
        });
        return result;
      } else
        throw new HttpException(
          'Can not find this renter to make a request',
          HttpStatus.NOT_FOUND,
        );
    } catch (error) {
      throw new Error(error);
    }
  }

  async findRoombyId(roomId: number) {
    try {
      const result = await this.prismaService.room.findUnique({
        where: {
          id: roomId,
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
      throw new Error(error);
    }
  }

  async modifyRoom(roomId: number, modifyRoom: updateRoomDto) {
    try {
      const existedRoom = await this.findRoombyId(roomId);
      if (existedRoom) {
        return await this.prismaService.room.update({
          where: {
            id: roomId,
          },
          data: {
            ...modifyRoom,
            personNumber: Number(modifyRoom.personNumber),
          },
        });
      } else
        throw new HttpException('Can not find this room', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteRoom(roomId: number) {
    try {
      const existedRoom = this.findRoombyId(roomId);
      if (existedRoom) {
        return await this.prismaService.room.delete({
          where: {
            id: roomId,
          },
        });
      } else
        throw new HttpException('Can not find this room', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllRentRequest(adminId: number) {
    try {
      const result = await this.prismaService.rentRequest.findMany({
        where: { ownerId: adminId },
        include: {
          renter: {
            include: {
              user: {
                select: {
                  name: true,
                  avatar: true,
                  phone: true,
                  id: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async acceptRequest(requestId: number) {
    try {
      return await this.prismaService.rentRequest.update({
        where: {
          id: requestId,
        },
        data: {
          status: RequestStatus.CONFIRM,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async addRenterToRoom(adminId: number, roomId: number, renterId: number) {
    try {
      const existedRoom = await this.prismaService.room.findUnique({
        where: {
          id: roomId,
        },
      });
      if (existedRoom) {
        const result = await this.prismaService.renting.create({
          data: {
            renter: {
              connect: {
                userId: renterId,
              },
            },
            accommodation: {
              connect: {
                id: existedRoom.accommodationId,
              },
            },
            owner: {
              connect: {
                userId: adminId,
              },
            },
            room: {
              connect: {
                id: roomId,
              },
            },
            status: RentingStatus.RENTING,
          },
        });
        // update room status
        await this.prismaService.room.update({
          where: { id: roomId },
          data: {
            status: RoomStatus.RENTING,
          },
        });
        // delete the rent request of that user
        await this.deleteRentRequest(adminId, roomId, renterId);
        return result;
      } else
        throw new HttpException('Can not find this room', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteRentRequest(adminId: number, roomId: number, renterId: number) {
    await this.prismaService.rentRequest.deleteMany({
      where: {
        AND: [
          {
            renterId: renterId,
          },
          {
            ownerId: adminId,
          },
        ],
      },
    });
  }

  async deleteRentRequestById(id: number) {
    await this.prismaService.rentRequest.delete({
      where: {
        id: id,
      },
    });
  }

  async getAllRooms(adminId: number) {
    try {
      const existedAcomms = await this.prismaService.accommodation.findUnique({
        where: {
          ownerId: adminId,
        },
      });
      return await this.prismaService.room.findMany({
        where: {
          accommodationId: existedAcomms.id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
