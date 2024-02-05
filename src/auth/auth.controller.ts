// auth.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/get-auth-token')
  async getAuthToken(): Promise<any> {
    try {
      return this.authService.getToken();
    } catch (error) {
      throw new Error(`Error getting auth token: ${error.message}`);
    }
  }

  @Get('/unlock')
  async unlock(): Promise<any> {
    try {
      return this.authService.unlock();
    } catch (error) {
      throw new Error(`Error unlocking: ${error.message}`);
    }
  }
}
