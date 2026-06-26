import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomerRepository } from '../../models/customer/customer.repo';
import { JwtService } from '@nestjs/jwt';
import type { RegisterDto } from './dto/register.dto';
import { UserRole } from '../../common/enum/role.enum';
import { provider_role } from '../../common/enum/provider.enum';

describe('AuthController', () => {
  let controller: AuthController;

  const mockCustomerRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: CustomerRepository, useValue: mockCustomerRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should return success message with customer data', async () => {
      const registerDto: RegisterDto = {
        email: 'test@test.com',
        phoneNumber: '1234567890',
        password: 'pass123',
        username: 'testuser',
        provider: provider_role.User,
        role: UserRole.user,
      };

      const createdCustomer = { _id: '123', ...registerDto };

      mockCustomerRepository.findOne.mockResolvedValue(null);
      mockCustomerRepository.create.mockResolvedValue(createdCustomer);

      const result = await controller.register(registerDto);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Customer registered successfully');
      expect(result.data).toEqual(createdCustomer);
    });
  });

  describe('login', () => {
    it('should return success message with access and refresh tokens', async () => {
      const loginDto = {
        email: 'test@test.com',
        password: 'pass123',
      };

      const customer = {
        _id: '123',
        email: 'test@test.com',
        role: 'user',
      };

      mockCustomerRepository.findOne.mockResolvedValue(customer);
      mockJwtService.signAsync
        .mockResolvedValueOnce('token123')
        .mockResolvedValueOnce('refresh123');

      const result = await controller.login(loginDto);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Customer logged in successfully');
      expect(result.data.accessToken).toBeDefined();
      expect(result.data.refreshToken).toBeDefined();
    });
  });
});
