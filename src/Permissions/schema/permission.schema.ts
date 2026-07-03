import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { Types } from 'mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
export type PermissionDocument = Permission & Document;
@Schema({ timestamps: true })
export class Permission {
  _id?: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId?: Types.ObjectId;
  @Prop({ type: [String] })
  permission?: string[];
}
export const permissionSchema = SchemaFactory.createForClass(Permission);
