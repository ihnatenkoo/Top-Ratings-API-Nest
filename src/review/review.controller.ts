import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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
  async delete(@Param('id') id: string) {
    return;
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return;
  }
}
