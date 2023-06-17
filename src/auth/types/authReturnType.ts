import { UserModel } from '../auth.model';

export type AuthReturnType = Omit<UserModel, 'passwordHash'>;
