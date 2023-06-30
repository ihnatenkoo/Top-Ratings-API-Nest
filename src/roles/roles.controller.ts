import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { RoleModel } from './role.model';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateRoleDto): Promise<RoleModel> {
    return await this.rolesService.create(dto);
  }

  @Delete('/:role')
  async delete(@Param('role') role: string): Promise<void> {
    return await this.rolesService.delete(role);
  }

  @Get('/all')
  async getAllRoles(): Promise<RoleModel[]> {
    return await this.rolesService.getAllRoles();
  }
}
