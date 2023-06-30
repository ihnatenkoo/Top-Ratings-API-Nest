import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RoleModel } from './role.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(RoleModel.name) private readonly roleModel: Model<RoleModel>,
  ) {}

  async create(dto: CreateRoleDto): Promise<RoleModel> {
    const roles = await this.getRoles();

    if (roles.some((item) => item.role === dto.role)) {
      throw new HttpException('Role already exists', HttpStatus.BAD_REQUEST);
    }

    return this.roleModel.create(dto);
  }

  async getRoles(): Promise<RoleModel[]> {
    return await this.roleModel.find();
  }
}
