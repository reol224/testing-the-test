import { Controller, Post, Body, Get } from '@nestjs/common';
import { VeriffService } from './veriff.service';

@Controller('veriff')
export class VeriffController {
  constructor(private readonly veriffService: VeriffService) {}

  @Post('vf')
  async initiateVerification() {
    return this.veriffService.initiateVerification(
    );
  }
}
