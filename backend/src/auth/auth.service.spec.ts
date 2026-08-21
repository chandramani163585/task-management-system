import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<Partial<UsersService>>;
  let jwtService: jest.Mocked<Partial<JwtService>>;

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
    };
    jwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user on valid credentials', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password_hash: await bcrypt.hash('password123', 10),
      };
      usersService.findByEmail.mockResolvedValue(mockUser as any);

      const result = await service.validateUser('test@example.com', 'password123');
      expect(result).toBeDefined();
      expect(result.email).toEqual('test@example.com');
      expect(result.password_hash).toBeUndefined(); // Should omit password
    });

    it('should throw UnauthorizedException on invalid password', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password_hash: await bcrypt.hash('password123', 10),
      };
      usersService.findByEmail.mockResolvedValue(mockUser as any);

      await expect(service.validateUser('test@example.com', 'wrongpassword'))
        .rejects
        .toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException on non-existent user', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await expect(service.validateUser('notfound@example.com', 'password123'))
        .rejects
        .toThrow(UnauthorizedException);
    });
  });
});
