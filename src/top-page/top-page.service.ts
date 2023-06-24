import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
import { TopPageModel } from './top-page.model';
import { NOT_FOUND } from 'src/constants';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name)
    private readonly topPageModel: Model<TopPageModel>,
  ) {}

  async create(createPageDto: CreatePageDto): Promise<TopPageModel> {
    return this.topPageModel.create(createPageDto);
  }

  async getById(pageId: string): Promise<TopPageModel> {
    const page = await this.topPageModel.findById(pageId);

    if (!page) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return page;
  }
}
