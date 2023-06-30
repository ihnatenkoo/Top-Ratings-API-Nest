import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'roles' })
export class RoleModel {
  @Prop({ unique: true })
  role: string;

  @Prop()
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(RoleModel);
