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
  HttpException,
  HttpStatus,
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
import { RECOMMEND_LEVEL } from './constants';
import { RequestCheckoutRoomDto } from './dto/request-checkout-room.dto';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';

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
      return result;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @UseGuards(JwtAuthGuard)
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
  @Get('/:id/all-request-rent')
  async getRequestRentByRenter(
    @Param('id') accommodationId: string,
    @Request() req,
  ) {
    const userId = req.user.id;
    return await this.accommodationService.getRentRequestByRenter(
      parseInt(userId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/request-rent')
  async requestRentRoom(
    @Param('id') accommodationId: string,
    @Request() req,
    // @Body() requestRentRoom: { email: string },
  ) {
    const renterId = req.user.id;
    const existedAccommodaiton =
      await this.accommodationService.findAccommodationById(
        parseInt(accommodationId),
      );
    // const existedRenter = await this.usersService.findByEmail(email);
    const { ownerId, id } = existedAccommodaiton;
    const result = await this.accommodationService.createRequestRentRoom({
      ownerId,
      renterId,
      accommodationId: id,
    });
    return result;
  }

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
  @UseGuards(JwtAuthGuard)
  @Post('/:id/rooms/:roomId/request-checkout')
  async requestCheckoutRoom(
    @Param('id') accommodationId: string,
    @Param('roomId') roomId: string,
    @Body() requestCheckoutRoom: { rentingId: number },
    @Request() req,
  ) {
    const renterId = req.user.id;
    const { rentingId } = requestCheckoutRoom;
    const existedAccommodaiton =
      await this.accommodationService.findAccommodationById(
        parseInt(accommodationId),
      );
    const { ownerId, id, rooms } = existedAccommodaiton;
    const result = await this.accommodationService.createRequestCheckoutRoom({
      ownerId,
      renterId,
      accommodationId: id,
      rentingId,
    });
    return result;
  }
}
