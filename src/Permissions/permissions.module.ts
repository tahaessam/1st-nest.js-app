import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, permissionSchema } from './schema/permission.schema';
import { PermissionRepository } from './repository/permission.repositry';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: permissionSchema },
    ]),
  ],
  providers: [PermissionRepository],
  exports: [PermissionRepository],
})
export class PermissionsModule {}
