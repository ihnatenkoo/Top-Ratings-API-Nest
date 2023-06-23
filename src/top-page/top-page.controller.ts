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
