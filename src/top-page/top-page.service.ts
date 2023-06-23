import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
import { TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name)
    private readonly topPageModel: Model<TopPageModel>,
  ) {}

  async create(createPageDto: CreatePageDto): Promise<TopPageModel> {
    return this.topPageModel.create(createPageDto);
  }
}
