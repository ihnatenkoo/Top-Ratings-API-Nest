import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/auth/auth.model';
import { RoleModel } from 'src/roles/role.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(RoleModel.name) private readonly roleModel: Model<RoleModel>,
  ) {}
  async findUser(email: string): Promise<UserModel> {
    const user = await this.userModel
      .findOne({ email })
      .populate('roles', '', this.roleModel);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
