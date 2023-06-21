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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NOT_FOUND } from 'src/constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
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
  async delete(@Param('id') id: string) {
    return;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: ProductModel) {
    return;
  }

  @Post()
  @HttpCode(200)
  async find(@Body() findProductDto: FindProductDto) {
    return;
  }
}
