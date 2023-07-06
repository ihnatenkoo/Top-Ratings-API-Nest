import { IsEmail, IsEnum } from 'class-validator';
import { Roles } from 'src/constants/roles';

export class AddRoleDto {
  @IsEmail()
  email: string;

  @IsEnum(Roles)
  role: Roles;
}
