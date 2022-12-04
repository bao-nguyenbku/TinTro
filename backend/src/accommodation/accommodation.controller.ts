import {
  Body,
  Controller,
  Get,
  Post,
  // UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { UtilsService } from '~/utils/utils.service';
// import { Roles } from '~/auth/role.decorator';
// import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { AccommodationService } from './accommodation.service';
import { RequestRentRoomDto } from './dto/request-rent-room.dto';

@Controller('accommodations')
export class AccommodationController {
  constructor(
    private readonly accommodationService: AccommodationService,
    private readonly utilsService: UtilsService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
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
          item.owner.name,
          item.description,
        ])
      ) {
        return item;
      }
    });
    return filterdAccommodations;
  }

  @Get('/all')
  async getAllAccommodation() {
    const result = await this.accommodationService.getAllAccommodation();
    return result.map((item) => ({
      ...item,
      reviewStar: Math.round(Math.random() * 5),
    }));
  }

  @Get('/:id')
  async findAccommodationById(@Param('id') id: string) {
    const result = await this.accommodationService.findAccommodationById(
      parseInt(id),
    );
    return result;
  }

  @Post('/:id/request-rent')
  async requestRentRoom(
    @Param('id') accommodationId: string,
    @Body() requestRentRoomDto: RequestRentRoomDto,
  ) {
    const { renterId } = requestRentRoomDto;
    const existedAccommodaitonPromise =
      await this.accommodationService.findAccommodationById(
        parseInt(accommodationId),
      );
    const { ownerId, id } = existedAccommodaitonPromise;
    const result = await this.accommodationService.createRequestRentRoom({
      ownerId,
      renterId,
      accommodationId: id,
    });
    return result;
  }
}
