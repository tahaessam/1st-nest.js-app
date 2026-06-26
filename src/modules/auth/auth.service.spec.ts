import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CustomerRepository } from '../../models/customer/customer.repo';
import { JwtService } from '@nestjs/jwt';
import type { RegisterDto } from './dto/register.dto';
import { UserRole } from '../../common/enum/role.enum';
import { provider_role } from '../../common/enum/provider.enum';

describe('AuthService', () => {
  let service: AuthService;

  const mockCustomerRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: CustomerRepository, useValue: mockCustomerRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should throw error if user already exists', async () => {
      const registerDto: RegisterDto = {
        email: 'test@test.com',
        phoneNumber: '1234567890',
        password: 'pass123',
        username: 'testuser',
        provider: provider_role.User,
        role: UserRole.user,
      };

      mockCustomerRepository.findOne.mockResolvedValue({ _id: '123' });

      await expect(service.register(registerDto)).rejects.toThrow(
        'user already exist',
      );
    });

    it('should create customer if user does not exist', async () => {
      const registerDto: RegisterDto = {
        email: 'test@test.com',
        phoneNumber: '1234567890',
        password: 'pass123',
        username: 'testuser',
        provider: provider_role.User,
        role: UserRole.user,
      };

      mockCustomerRepository.findOne.mockResolvedValue(null);
      mockCustomerRepository.create.mockResolvedValue({
        _id: '123',
        ...registerDto,
      });

      const result = await service.register(registerDto);

      expect(result).toBeDefined();
      expect(result._id).toBe('123');
      expect(mockCustomerRepository.create).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('should throw error if user not found', async () => {
      const loginDto = {
        email: 'test@test.com',
        password: 'pass123',
      };

      mockCustomerRepository.findOne.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        'Invalid credentials',
      );
    });

    it('should generate tokens on successful login', async () => {
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
      mockJwtService.signAsync.mockResolvedValue('token123');

      const result = await service.login(loginDto);

      expect(result.accessToken).toBe('token123');
      expect(result.refreshToken).toBe('token123');
      expect(mockJwtService.signAsync).toHaveBeenCalledTimes(2);
    });
  });
});
