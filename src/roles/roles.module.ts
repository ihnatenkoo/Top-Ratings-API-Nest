import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleModel, RoleSchema } from './role.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RoleModel.name, schema: RoleSchema }]),
  ],
  controllers: [RolesController],
  providers: [RolesService, JwtService],
  exports: [RolesService],
})
export class RolesModule {}
