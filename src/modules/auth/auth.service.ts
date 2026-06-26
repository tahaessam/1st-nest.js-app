import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from '../../models/customer/customer.repo';
@Injectable()
export class AuthService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly jwtService: JwtService,
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
    //! send email with otp
    //! save otp and user data into cache
    //! verify account before creating user

    const createCustomer = await this.customerRepository.create(registerDto);

    console.log('registerDto', registerDto);
    console.log('createCustomer', createCustomer);
    console.log('createCustomer.toObject', createCustomer?.toObject?.());

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
}
