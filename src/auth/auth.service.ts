import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CustomerRepository } from '../customer/repositories/customer.repo';
import { EmailService } from '../mailer/mail.service';
import { CACHE_PORT } from '../common/cache/cache.tokens';
import type { CachePort } from '../common/cache/cache.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    @Inject(CACHE_PORT) private readonly cachePort: CachePort,
  ) {}

  //! Register Flow
  async register(registerDto: RegisterDto) {
    // check if user already exists
    const customerExists = await this.customerRepository.findOne({
      email: registerDto.email,
    });

    // if user exists throw error
    if (customerExists) {
      throw new Error('user already exist');
    }

    //! TODO:
    //! hash password
    //! verify account before creating user

    const otp = this.generateOtp();
    const otpTtlSeconds = this.getOtpTtlSeconds();
    const cacheKey = this.getRegistrationCacheKey(registerDto.email);

    await this.cachePort.set(
      cacheKey,
      JSON.stringify({
        otp,
        user: registerDto,
      }),
      otpTtlSeconds,
    );

    await this.emailService.sendOtpEmail(registerDto.email, otp);

    const createCustomer = await this.customerRepository.create(registerDto);

    return createCustomer?.toObject?.() || createCustomer;
  }

  //! Login Flow
  async login(loginDto: loginDto) {
    // check if user exists
    const customer = await this.customerRepository.findOne({
      email: loginDto.email,
    });

    // if user does not exist throw error
    if (!customer) {
      throw new Error('user not found');
    }

    //! TODO:
    //! compare password
    //! if password incorrect throw error

    // generate access token
    const accessToken = await this.jwtService.signAsync({
      sub: customer._id,
      role: customer.role,
    });

    // generate refresh token
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: customer._id,
        role: customer.role,
      },
      {
        expiresIn: '7d',
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
  async getProfile(userId: string) {
    const user = await this.customerRepository.findOne({ _id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private generateOtp(): string {
    const length = Number(this.configService.get<string>('OTP_LENGTH') ?? 6);
    const safeLength = Number.isFinite(length) && length > 0 ? length : 6;

    return Array.from({ length: safeLength }, () =>
      Math.floor(Math.random() * 10).toString(),
    ).join('');
  }

  private getOtpTtlSeconds(): number {
    const ttl = Number(this.configService.get<string>('OTP_EXPIRES_IN') ?? 300);
    return Number.isFinite(ttl) && ttl > 0 ? ttl : 300;
  }

  private getRegistrationCacheKey(email: string): string {
    return `auth:register:${email.toLowerCase().trim()}`;
  }
}
