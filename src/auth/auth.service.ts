import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';
import { UserModel } from './auth.model';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  async register(registerDto: RegisterDto) {
    const passwordHash = await hash(registerDto.password, 10);

    return this.userModel.create({ ...registerDto, passwordHash });
  }

  async login(loginDto: LoginDto) {
    return;
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email });
  }
}
