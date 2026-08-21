import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password_hash);
    if (isMatch) {
      const { password_hash, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async guestLogin(): Promise<any> {
    // Return seeded Dexter user as default demo guest or find any user
    let user = await this.usersService.findByEmail('dexter@example.com');
    if (!user) {
      // Fallback if dexter not found
      user = await this.usersService.findByEmail('guest@example.com');
    }
    if (user) {
      const { password_hash, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Guest account not available');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
