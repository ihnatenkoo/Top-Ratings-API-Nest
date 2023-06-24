import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async create(@Body() createPageDto: CreatePageDto): Promise<TopPageModel> {
    return await this.topPageService.create(createPageDto);
  }

  @Get(':id')
  async getById(
    @Param('id', IdValidationPipe) pageId: string,
  ): Promise<TopPageModel> {
    return await this.topPageService.getById(pageId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', IdValidationPipe) pageId: string) {
    return await this.topPageService.delete(pageId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', IdValidationPipe) pageId: string,
    @Body() updatePageDto: CreatePageDto,
  ) {
    return await this.topPageService.update(pageId, updatePageDto);
  }

  @Post()
  @HttpCode(200)
  async find(@Body() dto: FindTopPageDto) {
    return;
  }
}
