import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../models/product/product.schema';
import {
  Admin,
  AdminSchema,
  Customer,
  CustomerSchema,
  Seller,
  SellerSchema,
  User,
  UserSchema,
} from '../../models/user/user.schema';
import { UserRole } from '../../common/decorators/enum/role.enum';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      {
        name: User.name,
        schema: UserSchema,
        discriminators: [
          { name: Admin.name, schema: AdminSchema, value: UserRole.admin },
          { name: Seller.name, schema: SellerSchema, value: UserRole.seller },
          { name: Customer.name, schema: CustomerSchema, value: UserRole.user },
        ],
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class SharedModule {}
