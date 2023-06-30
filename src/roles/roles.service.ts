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
    const role = await this.findRole(dto.role);

    if (role) {
      throw new HttpException('Role already exists', HttpStatus.BAD_REQUEST);
    }

    return this.roleModel.create(dto);
  }

  async delete(role: string): Promise<void> {
    const roleForDelete = await this.findRole(role);

    if (!roleForDelete) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    await this.roleModel.deleteOne({ role });
  }

  async getAllRoles(): Promise<RoleModel[]> {
    return await this.roleModel.find();
  }

  async findRole(role: string): Promise<RoleModel> {
    return await this.roleModel.findOne({ role });
  }
}
