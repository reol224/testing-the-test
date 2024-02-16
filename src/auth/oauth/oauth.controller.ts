import { Controller, Get } from '@nestjs/common';
import { OauthService } from './oauth.service';

@Controller('oauth')
export class OauthController {
  constructor(private readonly authService: OauthService) {}

  @Get('/get-oauth-token')
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
