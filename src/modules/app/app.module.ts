import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../config/configuration';
import { UserModule } from '../user/user.module';

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
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }), //! such as MongooseModule, TypeOrmModule, and GraphQLModule, can be treated as imports
    UserModule,
  ],

  controllers: [AppController],

  providers: [AppService], //! such as services, repositories, factories, and helpers, can be treated as providers
})
export class AppModule {}
