import {
  Body,
  Query,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateReviewDto } from './dto/createReviewDto';
import { ReviewService } from './review.service';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @User('id') userId: string,
    @Query('product') productId: string,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<ReviewModel> {
    return await this.reviewService.create(userId, productId, createReviewDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @User('id') userId: string,
    @Query('product') productId: string,
    @Param('id') reviewId: string,
  ): Promise<void> {
    await this.reviewService.delete(userId, productId, reviewId);
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
