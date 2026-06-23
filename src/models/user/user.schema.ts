import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserRole } from '../../common/decorators/enum/role.enum';
import { provider_role } from '../../common/decorators/enum/provider.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  discriminatorKey: 'role',
})
export class User {
  _id!: Types.ObjectId;

  @Prop({ required: true, trim: true })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ trim: true })
  phoneNumber!: string;

  @Prop({ enum: provider_role, default: provider_role.User })
  provider!: provider_role;

  @Prop({ enum: UserRole, required: true, default: UserRole.user })
  role!: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

@Schema()
export class Admin {
  @Prop({ default: false })
  isSuperAdmin!: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

@Schema()
export class Seller {
  @Prop({ trim: true })
  storeName?: string;

  @Prop({ trim: true })
  storeDescription?: string;

  @Prop({ default: false })
  isVerified!: boolean;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);

@Schema()
export class Customer {
  @Prop({ trim: true })
  address?: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
