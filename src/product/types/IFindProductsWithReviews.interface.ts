import { ReviewModel } from 'src/review/review.model';
import { ProductModel } from '../product.model';

export interface IFindProductsWithReviews extends ProductModel {
  reviews: ReviewModel[];
  reviewCount: number;
  reviewAvg: number;
}
