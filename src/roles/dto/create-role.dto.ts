import { IsEnum, IsString } from 'class-validator';

enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateRoleDto {
  @IsEnum(Roles)
  role: Roles;

  @IsString()
  description: string;
}
