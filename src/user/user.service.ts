import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindUserType, IBanUserResponse } from './types';
import { UserModel } from 'src/auth/auth.model';
import { RoleModel } from 'src/roles/role.model';
import { CAN_NOT_BAN_ADMIN, USER_NOT_FOUND } from 'src/constants';
import { Roles } from 'src/constants/roles';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(RoleModel.name) private readonly roleModel: Model<RoleModel>,
  ) {}

  async findUser(email: string): Promise<UserModel> {
    return await this.userModel
      .findOne({ email })
      .populate('roles', '', this.roleModel);
  }

  async banUser(email: string, banReasons: string): Promise<IBanUserResponse> {
    const user = (await this.findUser(email)) as FindUserType;

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    if (user.roles?.some(({ role }) => role === Roles.ADMIN)) {
      throw new HttpException(CAN_NOT_BAN_ADMIN, HttpStatus.BAD_REQUEST);
    }

    user.isBanned = true;
    user.banReasons = banReasons;

    const updatedUser = await user.save();

    return {
      email: updatedUser.email,
      banReasons: updatedUser.banReasons,
      isBanned: updatedUser.isBanned,
    };
  }
}
