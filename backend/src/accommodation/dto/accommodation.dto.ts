import { ApiProperty } from '@nestjs/swagger';
import { Owner, Room, RentRequest } from '@prisma/client';
import { ReviewEntity } from '~/review/entities/review.entity';
import { UserResponseDto } from '~/users/dto/user.dto';

export class AccommodationResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  addressNumber: string;

  @ApiProperty()
  addressStreet: string;

  @ApiProperty()
  addressDistrict: string;

  @ApiProperty()
  addressCity: string;

  @ApiProperty()
  area: number;

  @ApiProperty()
  rooms: Room[];

  @ApiProperty()
  price: number;

  @ApiProperty()
  owner: {
    user: UserResponseDto;
  };

  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  utilities: string[];

  @ApiProperty()
  rentRequest: RentRequest[];

  @ApiProperty()
  review: ReviewEntity[];

  @ApiProperty()
  reviewStar?: number;
}
