import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 15)
  password: string;

  @IsString()
  @Length(3, 12)
  name: string;
}
