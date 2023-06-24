import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TopLevelCategory } from '../top-page.model';
import { Type } from 'class-transformer';

class VacanciesDto {
  @IsNumber()
  count: number;
  @IsNumber()
  juniorSalary: number;
  @IsNumber()
  middleSalary: number;
  @IsNumber()
  seniorSalary: number;
}

class AdvantagesDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
}

export class CreatePageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => VacanciesDto)
  vacancies: VacanciesDto;

  @IsObject()
  @ValidateNested()
  @Type(() => AdvantagesDto)
  advantages: AdvantagesDto;

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
