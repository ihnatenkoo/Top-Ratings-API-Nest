import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  author: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  productId: string;
}
