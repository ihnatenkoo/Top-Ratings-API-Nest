import { Document, Types } from 'mongoose';
import { UserModel } from 'src/auth/auth.model';

export type FindUserType = Document<unknown, object, UserModel> &
  Omit<
    UserModel &
      Required<{
        _id: Types.ObjectId;
      }>,
    never
  >;

export interface IBanUserResponse {
  email: string;
  banReasons: string;
  isBanned: boolean;
}
