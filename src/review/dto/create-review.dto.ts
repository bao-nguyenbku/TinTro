import { OmitType } from '@nestjs/swagger';
import { ReviewEntity } from '../entities/review.entity';

export class CreateReviewDto extends OmitType(ReviewEntity, ['id', 'userId']) {}
