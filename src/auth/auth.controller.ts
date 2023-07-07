import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { IAccessToken } from './types';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<IAccessToken> {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<IAccessToken> {
    return await this.authService.login(loginDto);
  }
}
