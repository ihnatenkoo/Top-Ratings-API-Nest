import { Document, Types } from 'mongoose';
import { UserModel } from 'src/auth/auth.model';
import { RoleModel } from 'src/roles/role.model';

export type FindUserDoc = Document<unknown, object, UserModel> &
  Omit<
    UserModel &
      Required<{
        _id: Types.ObjectId;
      }>,
    never
  >;

export type FindUserWithPopulatedRoles = Omit<FindUserDoc, 'roles'> & {
  roles: RoleModel[];
};

export interface IBanUserResponse {
  email: string;
  banReasons: string;
  isBanned: boolean;
}
