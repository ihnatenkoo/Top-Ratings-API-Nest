import { IsEmail, IsString, MinLength } from 'class-validator';

export class BanUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  banReasons: string;
}
