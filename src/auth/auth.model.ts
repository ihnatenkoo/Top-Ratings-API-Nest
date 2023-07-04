import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { RoleModel } from '../roles/role.model';

@Schema({ versionKey: false, collection: 'users' })
export class UserModel {
  _id: Types.ObjectId;

  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'roles' })
  roles: RoleModel;

  @Prop({ default: false })
  isBanned: boolean;

  @Prop()
  banReasons: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
