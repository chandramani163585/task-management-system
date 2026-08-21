import { Controller, Post, UseGuards, Get, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('guest')
  async guestLogin() {
    const user = await this.authService.guestLogin();
    return this.authService.login(user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {
    // Initiates Google OAuth
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  async refresh() {
    return { message: 'Not implemented' };
  }

  @Post('logout')
  async logout() {
    return { message: 'Logged out successfully' };
  }
}
