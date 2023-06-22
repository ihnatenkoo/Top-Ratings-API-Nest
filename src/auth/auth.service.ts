import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthReturnType } from './types/authReturnType';
import { UserModel } from './auth.model';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  NOT_FOUND,
  USER_ALREADY_REGISTERED,
  WRONG_CREDENTIALS,
} from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthReturnType> {
    const user = await this.findUser(registerDto.email);

    if (user) {
      throw new HttpException(USER_ALREADY_REGISTERED, HttpStatus.BAD_REQUEST);
    }

    const passwordHash = await hash(registerDto.password, 10);
    const access_token = await this.generateAccessToken({
      email: registerDto.email,
    });

    const newUser = await this.userModel.create({
      ...registerDto,
      passwordHash,
    });

    newUser.passwordHash = undefined;

    return { ...newUser.toObject(), access_token };
  }

  async login(loginDto: LoginDto): Promise<AuthReturnType> {
    const user = await this.findUser(loginDto.email);

    if (!user) {
      throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const isPasswordCorrect = await this.validateUser(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(WRONG_CREDENTIALS, HttpStatus.BAD_REQUEST);
    }

    const access_token = await this.generateAccessToken({
      email: user.email,
      _id: user._id,
    });

    user.passwordHash = undefined;

    return { ...user, access_token };
  }

  async findUser(email: string): Promise<UserModel> {
    return this.userModel.findOne({ email }).lean();
  }

  async validateUser(password: string, passwordHash: string): Promise<boolean> {
    return compare(password, passwordHash);
  }

  async generateAccessToken(payload: Record<string, any>): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '30m',
    });
  }
}
