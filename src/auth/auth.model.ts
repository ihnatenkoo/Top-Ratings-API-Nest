import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'users' })
export class UserModel {
  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
