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
import { AuthReturnType } from './types/authReturnType';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerDto: RegisterDto): Promise<AuthReturnType> {
    const user = await this.authService.findUser(registerDto.email);

    if (user) {
      throw new HttpException(USER_ALREADY_REGISTERED, HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.authService.register(registerDto);

    newUser.passwordHash = undefined;

    return newUser;
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<AuthReturnType> {
    const user = await this.authService.findUser(loginDto.email);

    if (!user) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const isPasswordCorrect = await this.authService.validateUser(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(WRONG_CREDENTIALS, HttpStatus.BAD_REQUEST);
    }

    user.passwordHash = undefined;

    return user;
  }
}
