import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IAccessToken } from './types';
import { UserModel } from './auth.model';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RolesService } from 'src/roles/roles.service';
import { RoleModel } from 'src/roles/role.model';
import { Roles } from 'src/constants/roles';
import {
  NOT_FOUND,
  USER_ALREADY_REGISTERED,
  WRONG_CREDENTIALS,
} from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(RoleModel.name) private readonly roleModel: Model<RoleModel>,
    private readonly jwtService: JwtService,
    private readonly rolesService: RolesService,
  ) {}

  async register(registerDto: RegisterDto): Promise<IAccessToken> {
    const user = await this.findUser(registerDto.email);

    const role = await this.rolesService.findRole(Roles.USER);

    if (user) {
      throw new HttpException(USER_ALREADY_REGISTERED, HttpStatus.BAD_REQUEST);
    }

    const passwordHash = await hash(registerDto.password, 10);

    const newUser = await this.userModel.create({
      ...registerDto,
      passwordHash,
      roles: [role?._id],
    });

    const createdUser = await this.findUser(newUser.email);

    const access_token = await this.generateAccessToken({
      _id: createdUser._id,
      email: createdUser.email,
      roles: createdUser.roles,
    });

    return { access_token };
  }

  async login(loginDto: LoginDto): Promise<IAccessToken> {
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
      _id: user._id,
      email: user.email,
      roles: user.roles,
    });

    return { access_token };
  }

  async findUser(email: string): Promise<UserModel> {
    return this.userModel
      .findOne({ email })
      .populate('roles', '', this.roleModel)
      .lean();
  }

  async validateUser(password: string, passwordHash: string): Promise<boolean> {
    return compare(password, passwordHash);
  }

  async generateAccessToken(payload: Record<string, any>): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '24h',
    });
  }
}
