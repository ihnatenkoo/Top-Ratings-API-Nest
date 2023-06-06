import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {
    return;
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
  async update(@Param('id') id: string, @Body() dto: TopPageModel) {
    return;
  }

  @Post()
  @HttpCode(200)
  async find(@Body() dto: FindTopPageDto) {
    return;
  }
}
