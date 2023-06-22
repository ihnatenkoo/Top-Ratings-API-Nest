import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { NOT_FOUND } from '../constants';
import { CreateReviewDto } from './dto/createReviewDto';
import { ReviewService } from './review.service';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':productId/create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @User('_id') userId: string,
    @Param('productId') productId: string,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<ReviewModel> {
    return await this.reviewService.create(userId, productId, createReviewDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') reviewId: string) {
    const deletedReview = await this.reviewService.delete(reviewId);

    if (!deletedReview) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  //TODO: get all reviews by productId
  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return;
  }

  //TODO: delete all reviews by productId
  @Delete('byProduct/:productId')
  async deleteByProduct(@Param('productId') productId: string) {
    return;
  }
}
