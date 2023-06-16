import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(15)
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(12)
  name: string;
}
