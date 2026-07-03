import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AbstractRepository } from '../../database/abstract.repo';
import { Permission, PermissionDocument } from '../schema/permission.schema';

@Injectable()
export class PermissionRepository extends AbstractRepository<PermissionDocument> {
  constructor(
    @InjectModel(Permission.name)
    permissionModel: Model<PermissionDocument>,
  ) {
    super(permissionModel);
  }
}
