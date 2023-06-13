import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/createReviewDto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name) private reviewModel: Model<ReviewModel>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<ReviewModel> {
    return this.reviewModel.create(createReviewDto);
  }
}
