import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from '../../models/admin/admin.schema';
import { AdminRepository } from '../../models/admin/admin.repo';
import { Brand, BrandSchema } from '../../models/brand/brand.schema';
import { BrandRepository } from '../../models/brand/brand.repo';
import {
  Category,
  CategorySchema,
} from '../../models/category/category.schema';
import { CategoryRepository } from '../../models/category/category.repo';
import {
  Customer,
  CustomerSchema,
} from '../../models/customer/customer.schema';
import { CustomerRepository } from '../../models/customer/customer.repo';
import { Product, ProductSchema } from '../../models/product/product.schema';
import { ProductRepository } from '../../models/product/product.repo';
import { Seller, SellerSchema } from '../../models/seller/seller.schema';
import { SellerRepository } from '../../models/seller/seller.repo';
import { User, UserSchema } from '../../models/user/user.schema';
import { UserRepository } from '../../models/user/user.repo';
import { UserRole } from '../../common/enum/role.enum';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Brand.name, schema: BrandSchema },
      { name: Category.name, schema: CategorySchema },
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
  providers: [
    AdminRepository,
    BrandRepository,
    CategoryRepository,
    CustomerRepository,
    ProductRepository,
    SellerRepository,
    UserRepository,
  ],
  exports: [
    MongooseModule,
    AdminRepository,
    BrandRepository,
    CategoryRepository,
    CustomerRepository,
    ProductRepository,
    SellerRepository,
    UserRepository,
  ],
})
export class SharedModule {}
