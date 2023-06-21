import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductModel> {
    return await this.productService.create(createProductDto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: ProductModel) {
    return;
  }

  @Post()
  @HttpCode(200)
  async find(@Body() findProductDto: FindProductDto) {
    return;
  }
}
