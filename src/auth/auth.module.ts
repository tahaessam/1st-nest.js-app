import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from '../database/database.module';
import { MailModule } from '../mailer/mail.module';
import { CacheModule } from '../common/cache/cache.module';

@Module({
  imports: [
    SharedModule,
    MailModule,
    CacheModule,

    JwtModule.registerAsync({
      // هاتلي ConfigService عشان أقدر أقرأ القيم من ملف الـ config
      inject: [ConfigService],

      // الفنكشن دي بترجع إعدادات الـ JWT Module
      useFactory: (configService: ConfigService) => ({
        // المفتاح السري اللي هيتم بيه توقيع الـ token
        // أي token متوقع بمفتاح مختلف هيبقى غير صالح
        secret: configService.get('jwt.accessSecret'),

        signOptions: {
          // مدة صلاحية التوكن (مثلاً 15m أو 1d أو 7d)
          expiresIn: configService.get('jwt.accessExpiresIn'),
        },
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
