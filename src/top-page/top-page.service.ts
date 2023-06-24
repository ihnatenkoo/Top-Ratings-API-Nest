import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
import { TopPageModel } from './top-page.model';
import { NOT_FOUND } from 'src/constants';
import { FindTopPageDto } from './dto/find-top-page.dto';

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

  async delete(pageId: string): Promise<void> {
    const deletedPage = await this.topPageModel.findByIdAndDelete(pageId);

    if (!deletedPage) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  async update(
    pageId: string,
    updatePageDto: CreatePageDto,
  ): Promise<TopPageModel> {
    const updatedPage = await this.topPageModel.findByIdAndUpdate(
      pageId,
      updatePageDto,
      {
        new: true,
      },
    );

    if (!updatedPage) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return updatedPage;
  }

  async findByCategory({
    firstCategory,
  }: FindTopPageDto): Promise<TopPageModel[]> {
    return this.topPageModel.find({ firstCategory });
  }

  async textSearch(text: string): Promise<TopPageModel[]> {
    return this.topPageModel.find({
      $text: { $search: text, $caseSensitive: false },
    });
  }
}
