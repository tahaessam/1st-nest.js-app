import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesPermissionsGuard } from '../common/guards/roles-permissions.guard';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';
import { PermissionsModule } from '../Permissions/permissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }), //! such as ConfigModule, DatabaseModule, and AuthModule, can be treated as imports

    // isGlobal: true عشان ما نحتاجش نعمل import لل ConfigModule في كل module
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),
      }),
    }), //! such as MongooseModule, TypeOrmModule, and GraphQLModule, can be treated as imports
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.accessSecret'),
      }),
    }),
    UserModule,
    AuthModule,
    BrandModule,
    CategoryModule,
    ProductModule,
    PermissionsModule,
  ],

  controllers: [AppController],

  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesPermissionsGuard,
    },
  ], //! such as services, repositories, factories, and helpers, can be treated as providers
})
export class AppModule {}
