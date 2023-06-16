import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
