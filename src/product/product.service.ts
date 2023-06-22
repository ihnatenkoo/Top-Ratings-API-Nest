import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFindProductsWithReviews } from './types/IFindProductsWithReviews.interface';
import { ProductModel } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductModel>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductModel> {
    return this.productModel.create(createProductDto);
  }

  async findById(id: string): Promise<ProductModel | null> {
    return this.productModel.findById(id);
  }

  async deleteById(id: string): Promise<number> {
    const { deletedCount } = await this.productModel.deleteOne({ _id: id });

    return deletedCount;
  }

  async updateById(
    id: string,
    updateProductDto: CreateProductDto,
  ): Promise<ProductModel | null> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
  }

  async findWithReviews({
    category,
    limit,
  }: FindProductDto): Promise<IFindProductsWithReviews[]> {
    return this.productModel.aggregate([
      {
        $match: {
          categories: category,
        },
      },
      { $sort: { _id: 1 } },
      {
        $limit: limit,
      },
      {
        $lookup: {
          localField: '_id',
          from: 'reviews',
          foreignField: 'productId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          reviewCount: { $size: '$reviews' },
          reviewAvg: { $avg: '$reviews.rating' },
        },
      },
    ]) as unknown as IFindProductsWithReviews[];
  }
}
