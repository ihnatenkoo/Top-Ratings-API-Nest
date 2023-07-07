import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NOT_FOUND } from 'src/constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { IFindProductsWithReviews } from './types/IFindProductsWithReviews.interface';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductModel> {
    return await this.productService.create(createProductDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ProductModel> {
    const product = await this.productService.findById(id);

    if (!product) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return product;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id') id: string): Promise<void> {
    const deletedCount = await this.productService.deleteById(id);

    if (!deletedCount) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<ProductModel> {
    const updatedProduct = await this.productService.updateById(
      id,
      updateProductDto,
    );

    if (!updatedProduct) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return updatedProduct;
  }

  @Post('find')
  @HttpCode(200)
  async findWithReviews(
    @Body() findProductDto: FindProductDto,
  ): Promise<IFindProductsWithReviews[]> {
    return await this.productService.findWithReviews(findProductDto);
  }
}
