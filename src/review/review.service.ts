import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { PRODUCT_NOT_FOUND } from 'src/constants';
import { ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/createReviewDto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name) private reviewModel: Model<ReviewModel>,
    private readonly productService: ProductService,
  ) {}

  async create(
    productId: string,
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewModel> {
    const product = await this.productService.findById(productId);

    if (!product) {
      throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.reviewModel.create({
      ...createReviewDto,
      productId: new mongoose.Types.ObjectId(productId),
    });
  }

  async delete(reviewId: string) {
    return this.reviewModel.findByIdAndDelete(reviewId);
  }
}
