import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './entities/review.entity';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewReview(
    createReviewDto: CreateReviewDto,
    userId: number,
  ): Promise<ReviewEntity> {
    const rating = createReviewDto.rating;
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }
    const review = await this.prisma.review.create({
      data: {
        rating,
        user: {
          connect: {
            id: userId,
          },
        },
        accommodation: {
          connect: {
            id: createReviewDto.accommodationId,
          },
        },
      },
    });
    return review;
  }
}
