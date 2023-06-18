import { UserModel } from '../auth.model';

interface IAccessToken {
  access_token: string;
}

export type AuthReturnType = Omit<UserModel, 'passwordHash'> & IAccessToken;
