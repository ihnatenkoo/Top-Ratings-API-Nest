import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false, collection: 'roles' })
export class RoleModel {
  _id: Types.ObjectId;

  @Prop({ unique: true })
  role: string;

  @Prop()
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(RoleModel);
