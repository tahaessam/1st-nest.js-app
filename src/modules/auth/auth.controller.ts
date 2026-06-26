import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { RegisterDto } from './dto/register.dto';
import type { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //auth/register
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const createdCustomer = await this.authService.register(registerDto);
    return {
      message: 'Customer registered successfully',
      success: true,
      data: createdCustomer,
    };
  }
  //auth/login
  @Post('login')
  async login(@Body() loginDto: loginDto) {
    const tokens = await this.authService.login(loginDto);
    return {
      message: 'Customer logged in successfully',
      success: true,
      data: tokens,
    };
  }
  //get prfile
}
