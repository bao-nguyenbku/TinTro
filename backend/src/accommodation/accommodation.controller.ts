import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Query,
  Logger,
  Request,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Review } from '@prisma/client';
import { UsersService } from '~/users/users.service';
import { UtilsService } from '~/utils/utils.service';
// import { Roles } from '~/auth/role.decorator';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { AccommodationService } from './accommodation.service';

import { AccommodationResponseDto } from './dto/accommodation.dto';
// import { RequestRentRoomDto } from './dto/request-rent-room.dto';

@Controller('accommodations')
export class AccommodationController {
  constructor(
    private readonly accommodationService: AccommodationService,
    private readonly utilsService: UtilsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ type: AccommodationResponseDto, isArray: true })
  async searchAccommodationByKeyword(@Query('search') keyword: string) {
    const accommodations =
      await this.accommodationService.getAllAccommodation();
    const filterdAccommodations = accommodations.filter((item) => {
      if (
        this.utilsService.isContain(keyword, [
          item.addressDistrict,
          item.addressCity,
          item.addressNumber,
          item.addressStreet,
          item.name,
          item.description,
        ])
      ) {
        return item;
      }
    });
    return filterdAccommodations;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @ApiOkResponse({ type: AccommodationResponseDto, isArray: true })
  async getAllAccommodation() {
    try {
      const result = await this.accommodationService.getAllAccommodation();
      return result.map((item) => ({
        ...item,
        reviewStar: item?.review?.length
          ? item.review.reduce((acc, cur) => acc + cur.rating, 0) /
            item.review.length
          : 0,
      }));
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Get('/:id')
  @ApiOkResponse({ type: AccommodationResponseDto })
  async findAccommodationById(@Param('id') id: string) {
    const result = await this.accommodationService.findAccommodationById(
      parseInt(id),
    );
    const newResult = {
      ...result,
      reviewStar: 0,
    };
    newResult.reviewStar = result.review?.length
      ? result.review.reduce(
          (acc: number, cur: Review) => acc + cur.rating,
          0,
        ) / result.review.length
      : 0;
    return newResult;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/request-rent')
  async getRequestRentByRenter(
    @Param('id') accommodationId: string,
    @Request() req,
  ) {
    const userId = req.user.id;
    return await this.accommodationService.getRentRequestByRenter(
      parseInt(userId),
    );
  }
  @Post('/:id/request-rent')
  async requestRentRoom(
    @Param('id') accommodationId: string,
    @Body() requestRentRoom: { email: string },
  ) {
    const { email } = requestRentRoom;

    const existedAccommodaiton =
      await this.accommodationService.findAccommodationById(
        parseInt(accommodationId),
      );
    const existedRenter = await this.usersService.findByEmail(email);
    const { ownerId, id } = existedAccommodaiton;
    const result = await this.accommodationService.createRequestRentRoom({
      ownerId,
      renterId: existedRenter.id,
      accommodationId: id,
    });
    return result;
  }
}
