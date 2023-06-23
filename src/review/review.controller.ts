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
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @User('id', IdValidationPipe) userId: string,
    @Query('product', IdValidationPipe) productId: string,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<ReviewModel> {
    return await this.reviewService.create(userId, productId, createReviewDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @User('id', IdValidationPipe) userId: string,
    @Query('product', IdValidationPipe) productId: string,
    @Param('id', IdValidationPipe) reviewId: string,
  ): Promise<void> {
    await this.reviewService.delete(userId, productId, reviewId);
  }

  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId', IdValidationPipe) productId: string,
  ): Promise<ReviewModel[]> {
    return await this.reviewService.getByProduct(productId);
  }

  @Delete('byProduct/:productId')
  @UseGuards(JwtAuthGuard)
  async deleteAllByProduct(
    @Param('productId', IdValidationPipe) productId: string,
  ): Promise<{ deletedCount: number }> {
    return await this.reviewService.deleteAllByProduct(productId);
  }
}
