import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { RoomStatisticsDto } from './dto/room-statistics.dto';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getRoomsStatistics(
    userId: number,
  ): Promise<RoomStatisticsDto | object> {
    const roomsStatistics = await this.prisma.accommodation.findUniqueOrThrow({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
        rooms: true,
      },
    });
    return roomsStatistics;
  }
}
