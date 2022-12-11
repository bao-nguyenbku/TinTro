import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiAcceptedResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { Roles } from '~/auth/role.decorator';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('rooms')
  @ApiAcceptedResponse({ description: 'Get rooms statistics' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  async getRoomsStatistics(@Request() req) {
    try {
      const userId = req.user.id;
      const roomsStatistics = await this.statisticsService.getRoomsStatistics(
        userId,
      );
      return roomsStatistics;
    } catch (err) {
      if (err.code === 'P2025') {
        throw new Error(
          'Chủ trọ này chưa được tạo phòng. Vui lòng liên hệ quản trị viên để được hỗ trợ.',
        );
      }
    }
  }
}
