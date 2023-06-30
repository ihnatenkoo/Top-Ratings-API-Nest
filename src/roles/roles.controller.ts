import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.rolesService.create(dto);
  }
}
