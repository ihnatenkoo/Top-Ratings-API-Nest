import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductModel } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';

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
}
