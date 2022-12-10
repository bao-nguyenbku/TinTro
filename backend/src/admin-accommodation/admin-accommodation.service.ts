import { Prisma, RequestStatus, RoomStatus } from '@prisma/client';
import { HttpException, HttpStatus,Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { AdminaccommodationResponseDto } from './dto/admin-accommodation.dto';
import { RoomDto } from './dto/room.dto';
import { AccommodationService } from '~/accommodation/accommodation.service';
import { UtilsService } from '~/utils/utils.service';
import { UsersService } from '~/users/users.service';

@Injectable()
export class AdminAccommodationService {
    
    constructor(
        private readonly prismaService: PrismaService,
        private readonly accommodationService: AccommodationService,
        private readonly utilsService: UtilsService,
        private readonly usersService: UsersService,
        ) {}

    async getAllAdminAccommodation(adminId: number) {
        try {
            const result = await this.prismaService.accommodation.findMany({
                where:{
                    ownerId : adminId,
                },
                include: {
                    owner: {
                        include: {
                          user: true,
                        },
                      },
                    rooms: true,
                }
                
            })
            if (!result) {
                throw new HttpException(
                  'Can not find this accommodation',
                  HttpStatus.NOT_FOUND,
                );
              }
              return {
                ...result,                
              };
        } catch (error) {
            throw new Error(error)
        }

    }

    async createRoom(adminId: number, accomId: number, newRoom: {}) {
        try {
            const existedAccommodaiton = await this.accommodationService.findAccommodationById(accomId);
            if (existedAccommodaiton.ownerId == adminId)
            {
                const result = await this.prismaService.room.create({
                    data: {
                        accommodationId: accomId,
                        status: RoomStatus.AVAILABLE,
                    }
                })
                return result;
            }
            else throw new HttpException(
                'Can not find this renter to make a request',
                HttpStatus.NOT_FOUND,
              );
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllRentRequest(adminId: number) {
        try {
            const result = await this.prismaService.rentRequest.findMany({
                where: {ownerId: adminId,},
            });
            return result;
        } catch (error) {
            throw new Error(error)
        }
    }
}
