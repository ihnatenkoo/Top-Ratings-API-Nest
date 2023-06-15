import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { NOT_FOUND } from '../constants';
import { CreateReviewDto } from './dto/createReviewDto';
import { ReviewService } from './review.service';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() createReviewDto: CreateReviewDto): Promise<ReviewModel> {
    return this.reviewService.create(createReviewDto);
  }

  @Delete(':id')
  async delete(@Param('id') reviewId: string) {
    const deletedReview = await this.reviewService.delete(reviewId);

    if (!deletedReview) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return;
  }
}
