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
<<<<<<< HEAD
=======
  HttpException,
  HttpStatus,
  Delete,
>>>>>>> remotes/origin/ntb/checkout-when-renting
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Review } from '@prisma/client';
import { UsersService } from '~/users/users.service';
import { UtilsService } from '~/utils/utils.service';
// import { Roles } from '~/auth/role.decorator';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { AccommodationService } from './accommodation.service';
<<<<<<< HEAD

import { AccommodationResponseDto } from './dto/accommodation.dto';
// import { RequestRentRoomDto } from './dto/request-rent-room.dto';
=======
import { AccommodationResponseDto } from './dto/accommodation.dto';
// import { RequestRentRoomDto } from './dto/request-rent-room.dto';
import { RECOMMEND_LEVEL } from './constants';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
>>>>>>> remotes/origin/ntb/checkout-when-renting

@Controller('accommodations')
export class AccommodationController {
  constructor(
    private readonly accommodationService: AccommodationService,
    private readonly utilsService: UtilsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
<<<<<<< HEAD
  @Get()
=======
  @Get('')
>>>>>>> remotes/origin/ntb/checkout-when-renting
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
<<<<<<< HEAD
      return result.map((item) => ({
        ...item,
        reviewStar: item?.review?.length
          ? item.review.reduce((acc, cur) => acc + cur.rating, 0) /
            item.review.length
          : 0,
      }));
=======
      return result;
>>>>>>> remotes/origin/ntb/checkout-when-renting
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

<<<<<<< HEAD
  @Get('/:id')
  @ApiOkResponse({ type: AccommodationResponseDto })
  async findAccommodationById(@Param('id') id: string) {
    const result = await this.accommodationService.findAccommodationById(
      parseInt(id),
    );
=======
  @UseGuards(JwtAuthGuard)
  @Delete('/request-rent/:id')
  @ApiOkResponse({ type: AccommodationResponseDto, isArray: true })
  async cancelRentRequest(@Param('id') requestId: string) {
    const result = await this.accommodationService.cancelRentRequest(
      parseInt(requestId),
    );
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all-rent-request')
  async getRequestRentByRenter(@Request() req) {
    const userId = req.user.id;
    return await this.accommodationService.getRentRequestByRenter(
      parseInt(userId),
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiOkResponse({ type: AccommodationResponseDto })
  async findAccommodationById(@Param('id') id: number) {
    const result = await this.accommodationService.findAccommodationById(id);
>>>>>>> remotes/origin/ntb/checkout-when-renting
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
<<<<<<< HEAD
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

=======
  async requestRentRoom(
    @Param('id') accommodationId: string,
    @Request() req,
    // @Body() requestRentRoom: { email: string },
  ) {
    const renterId = req.user.id;
>>>>>>> remotes/origin/ntb/checkout-when-renting
    const existedAccommodaiton =
      await this.accommodationService.findAccommodationById(
        parseInt(accommodationId),
      );
<<<<<<< HEAD
    const existedRenter = await this.usersService.findByEmail(email);
    const { ownerId, id } = existedAccommodaiton;
    const result = await this.accommodationService.createRequestRentRoom({
      ownerId,
      renterId: existedRenter.id,
=======
    // const existedRenter = await this.usersService.findByEmail(email);
    const { ownerId, id } = existedAccommodaiton;
    const result = await this.accommodationService.createRequestRentRoom({
      ownerId,
      renterId,
>>>>>>> remotes/origin/ntb/checkout-when-renting
      accommodationId: id,
    });
    return result;
  }
<<<<<<< HEAD
=======

  @UseGuards(JwtAuthGuard)
  @Get('/all/recommend')
  async getRecommendAccommodations() {
    const result = await this.accommodationService.getRecommendAccommodations();
    return result.filter((item) => item.reviewStar > RECOMMEND_LEVEL);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createAccommodations(
    @Body() createAccommodationList: CreateAccommodationDto[],
  ) {
    return await Promise.all(
      createAccommodationList.map(async (data) => {
        await this.accommodationService.createAccommodation(data);
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/renting')
  async getCurrentRentingByRenter(
    @Request() req,
    @Param('id') accommodationId: string,
  ) {
    const renterId = req.user.id;
    const result = await this.accommodationService.getCurrentRentingByRenter(
      parseInt(renterId),
    );
    if (result.accommodationId !== parseInt(accommodationId)) {
      throw new HttpException(
        'This renter did not rent any room in this accommodation',
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
>>>>>>> remotes/origin/ntb/checkout-when-renting
}
