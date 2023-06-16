import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './auth.model';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  async register(registerDto: RegisterDto) {
    return this.userModel.create(registerDto);
  }
}
