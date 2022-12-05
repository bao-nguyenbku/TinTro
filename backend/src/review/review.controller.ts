import { HttpException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './entities/review.entity';
import { ApiCreatedResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: ReviewEntity })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createNewReview(
    @Request() req,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<ReviewEntity> {
    const userId = req.user.id;
    try {
      const review = await this.reviewService.createNewReview(
        createReviewDto,
        userId,
      );
      return review;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}
