import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolesDecorator } from 'src/decorators/role.decorator';
import { Roles } from 'src/constants/roles';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserModel } from 'src/auth/auth.model';
import { FindUserDto } from './dto/find-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @RolesDecorator(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @HttpCode(200)
  async findUser(@Body() dto: FindUserDto): Promise<UserModel> {
    return await this.userService.findUser(dto.email);
  }
}
