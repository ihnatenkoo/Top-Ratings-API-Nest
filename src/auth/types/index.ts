import { Roles } from 'src/constants/roles';

export interface IAccessToken {
  access_token: string;
}

interface IRole {
  _id: string;
  role: Roles;
  description: string;
}

export interface IJwtPayload {
  _id: string;
  email: string;
  roles: IRole[];
}
