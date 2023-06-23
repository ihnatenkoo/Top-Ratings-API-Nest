import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageService } from './top-page.service';
import { TopPageModel, TopPageSchema } from './top-page.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TopPageModel.name, schema: TopPageSchema },
    ]),
  ],
  controllers: [TopPageController],
  providers: [TopPageService],
})
export class TopPageModule {}
