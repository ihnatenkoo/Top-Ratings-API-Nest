import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  ACCESS_DENIED,
  BAD_DELETE_REVIEW_REQUEST,
  PRODUCT_NOT_FOUND,
  REVIEW_NOT_FOUND,
} from 'src/constants';
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
    userId: string,
    productId: string,
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewModel> {
    const product = await this.productService.findById(productId);

    if (!product) {
      throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.reviewModel.create({
      author: new mongoose.Types.ObjectId(userId),
      productId: new mongoose.Types.ObjectId(productId),
      ...createReviewDto,
    });
  }

  async delete(userId: string, productId: string, reviewId: string) {
    const review = await this.reviewModel.findById(reviewId);

    if (!review) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (review.author.toString() !== userId) {
      throw new HttpException(ACCESS_DENIED, HttpStatus.FORBIDDEN);
    }

    const product = await this.productService.findById(productId);

    if (!product) {
      throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (review.productId.toString() !== productId) {
      throw new HttpException(
        BAD_DELETE_REVIEW_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.reviewModel.findByIdAndDelete(reviewId);
  }

  async getByProduct(productId: string): Promise<ReviewModel[]> {
    return this.reviewModel.find({
      productId: new mongoose.Types.ObjectId(productId),
    });
  }
}
