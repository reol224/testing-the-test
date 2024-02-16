import { Module } from '@nestjs/common';
import { OauthController } from './oauth/oauth.controller';
import { OauthService } from './oauth/oauth.service';
import { HttpModule } from '@nestjs/axios';
import { VeriffController } from './veriff/veriff.controller';
import { VeriffService } from './veriff/veriff.service';

@Module({
  imports: [HttpModule],
  controllers: [OauthController, VeriffController],
  providers: [OauthService, VeriffService],
})
export class AuthModule {}
