import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RoleModel } from './role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(RoleModel.name) private readonly roleModel: Model<RoleModel>,
  ) {}

  async create(dto: CreateRoleDto) {
    return this.roleModel.create(dto);
  }
}
