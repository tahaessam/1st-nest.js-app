import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type AdminDocument = HydratedDocument<User & Admin>;

@Schema()
export class Admin {
  @Prop({ default: false })
  isSuperAdmin!: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
