import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repo';
import { Admin, AdminDocument } from './admin.schema';

@Injectable()
export class AdminRepository extends AbstractRepository<AdminDocument> {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
  ) {
    super(adminModel);
  }
}
