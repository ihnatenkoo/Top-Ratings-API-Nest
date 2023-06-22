import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false, collection: 'users' })
export class UserModel {
  _id: Types.ObjectId;

  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
