import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthDto) {
    return;
  }
}
