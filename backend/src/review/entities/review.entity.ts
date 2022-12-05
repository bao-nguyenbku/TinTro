import {
  ApiBadRequestResponse,
  ApiProperty,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { Review } from '@prisma/client';
import { IsNumber } from 'class-validator';

export class ReviewEntity implements Review {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  accommodationId: number;

  @ApiProperty()
  @IsNumber()
  rating: number;
}
