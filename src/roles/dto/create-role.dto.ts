import { IsEnum, IsString } from 'class-validator';
import { Roles } from 'src/constants/roles';

export class CreateRoleDto {
  @IsEnum(Roles)
  role: Roles;

  @IsString()
  description: string;
}
