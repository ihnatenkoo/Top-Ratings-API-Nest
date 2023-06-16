import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  NOT_FOUND,
  USER_ALREADY_REGISTERED,
  WRONG_CREDENTIALS,
} from 'src/constants';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.findUser(registerDto.email);

    if (user) {
      throw new HttpException(USER_ALREADY_REGISTERED, HttpStatus.BAD_REQUEST);
    }

    return this.authService.register(registerDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.findUser(loginDto.email);

    if (!user) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const passwordValid = await this.authService.login(
      loginDto.password,
      user.passwordHash,
    );

    if (!passwordValid) {
      throw new HttpException(WRONG_CREDENTIALS, HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
