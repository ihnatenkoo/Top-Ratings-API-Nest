import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { RoleModel } from './role.model';
import { RolesDecorator } from 'src/decorators/role.decorator';
import { Roles } from 'src/constants/roles';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @RolesDecorator(Roles.ADMIN)
  @UseGuards(RolesGuard)
  async create(@Body() dto: CreateRoleDto): Promise<RoleModel> {
    return await this.rolesService.create(dto);
  }

  @Delete('/:role')
  @RolesDecorator(Roles.ADMIN)
  @UseGuards(RolesGuard)
  async delete(@Param('role') role: string): Promise<void> {
    return await this.rolesService.delete(role);
  }

  @Get('/all')
  @RolesDecorator(Roles.ADMIN)
  @UseGuards(RolesGuard)
  async getAllRoles(): Promise<RoleModel[]> {
    return await this.rolesService.getAllRoles();
  }
}
