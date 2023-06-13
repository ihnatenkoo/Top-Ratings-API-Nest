import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RatingType = 1 | 2 | 3 | 4 | 5;
export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true, versionKey: false, collection: 'reviews' })
export class ReviewModel {
  @Prop()
  author: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: RatingType;

  @Prop()
  productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
