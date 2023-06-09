import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FindUserDoc,
  FindUserWithPopulatedRoles,
  IBanUserResponse,
} from './types';
import { UserModel } from 'src/auth/auth.model';
import { RoleModel } from 'src/roles/role.model';
import { RolesService } from 'src/roles/roles.service';
import {
  CAN_NOT_BAN_ADMIN,
  USER_HAS_THIS_ROLE,
  USER_NOT_FOUND,
} from 'src/constants';
import { Roles } from 'src/constants/roles';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(RoleModel.name) private readonly roleModel: Model<RoleModel>,
    private readonly rolesService: RolesService,
  ) {}

  async findUser(email: string): Promise<FindUserDoc> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  async findUserWithRoles(email: string): Promise<FindUserWithPopulatedRoles> {
    const user = (await this.userModel
      .findOne({ email })
      .populate('roles', '', this.roleModel)) as FindUserWithPopulatedRoles;

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  async findUserForAuth(email: string): Promise<FindUserWithPopulatedRoles> {
    return this.userModel
      .findOne({ email })
      .populate('roles', '', this.roleModel);
  }

  async banUser(email: string, banReasons: string): Promise<IBanUserResponse> {
    const user = await this.findUserWithRoles(email);

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

  async unBanUser(email: string): Promise<IBanUserResponse> {
    const user = await this.findUser(email);

    user.isBanned = false;
    user.banReasons = undefined;

    const updatedUser = await user.save();

    return {
      email: updatedUser.email,
      banReasons: updatedUser.banReasons,
      isBanned: updatedUser.isBanned,
    };
  }

  async addRole(email: string, role: string): Promise<void> {
    const user = await this.findUserWithRoles(email);
    const findRole = await this.rolesService.findRole(role);

    if (user.roles.some((roleObj) => roleObj.role === findRole.role)) {
      throw new BadRequestException(USER_HAS_THIS_ROLE);
    }

    user.roles = [...user.roles, findRole._id as any as RoleModel];

    await user.save();
  }

  async deleteRole(email: string, role: string): Promise<void> {
    const user = await this.findUserWithRoles(email);

    user.roles = user.roles.filter((roleObj) => roleObj.role !== role);

    await user.save();
  }
}
