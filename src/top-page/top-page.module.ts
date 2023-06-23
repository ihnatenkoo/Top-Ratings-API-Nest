import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchema } from 'src/review/review.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReviewModel.name, schema: ReviewSchema },
    ]),
  ],
  controllers: [TopPageController],
})
export class TopPageModule {}
