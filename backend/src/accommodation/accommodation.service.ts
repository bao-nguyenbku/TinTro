import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccommodationService {
  constructor(private readonly prismaService: PrismaService) {}
  
  getAllAccommodation() {
    return this.prismaService.accommodation.findMany({
      include: {
        owner: {
          select: {
            phone: true,
            name: true
          }
        }
      }
    });
  }

}
