import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolesDecorator } from 'src/decorators/role.decorator';
import { Roles } from 'src/constants/roles';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserModel } from 'src/auth/auth.model';
import { UserService } from './user.service';
import { FindUserDto } from './dto/find-user.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { IBanUserResponse } from './types';
import { USER_NOT_FOUND } from 'src/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @RolesDecorator(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(RolesGuard)
  @HttpCode(200)
  async findUser(@Body() dto: FindUserDto): Promise<UserModel> {
    const user = await this.userService.findUser(dto.email);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  @Post('/ban')
  @UsePipes(new ValidationPipe())
  @RolesDecorator(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(RolesGuard)
  @HttpCode(200)
  async banUser(
    @Body() { email, banReasons }: BanUserDto,
  ): Promise<IBanUserResponse> {
    return this.userService.banUser(email, banReasons);
  }

  @Post('/unban')
  @UsePipes(new ValidationPipe())
  @RolesDecorator(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(RolesGuard)
  @HttpCode(200)
  async unBanUser(
    @Body() { email }: Pick<BanUserDto, 'email'>,
  ): Promise<IBanUserResponse> {
    return await this.userService.unBanUser(email);
  }
}
