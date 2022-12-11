import { OmitType } from '@nestjs/swagger';
import { AccommodationEntity } from '../entities/accommodation.entity';

export class CreateAccommodationDto extends OmitType(AccommodationEntity, [
  'id',
  'rooms',
  'owner',
  'rentRequest',
  'review',
  'reviewStar',
]) {
  ownerId: number;
}
