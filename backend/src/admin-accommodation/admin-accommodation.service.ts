import { Prisma, RequestStatus, RoomStatus } from '@prisma/client';
import { HttpException, HttpStatus,Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { AdminaccommodationResponseDto } from './dto/admin-accommodation.dto';

@Injectable()
export class AdminAccommodationService {
    AccommodationService: any;
    constructor(private readonly prismaService: PrismaService) {}

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
            const existedAccommodaiton = await this.AccommodationService.findAll(accomId);
            if (existedAccommodaiton in this.getAllAdminAccommodation(adminId)) {
                const result = await this.prismaService.room.create({
                    data: {                        
                        accommodation: existedAccommodaiton,
                        accommodationId: accomId,
                        status: RoomStatus.AVAILABLE,
                    },                    
                });
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
}
