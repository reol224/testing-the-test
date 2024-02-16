import {
  Body,
  Controller,
  NotAcceptableException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FintracVerificationDto } from '../dtos/fintrac_verification.dto';
import { FintracVerification } from '../entities/fintrac_verification.entity';
import { FintracVerificationService } from '../../services/fintrac_verification.service';

@Controller('fintracverification')
export class FintracVerificationController {
  constructor(
    private readonly fintracVerificationService: FintracVerificationService,
  ) {}

  @Post(':id')
  async add(
    @Param('id') id: number,
    @Body() fintracVerificationDto: FintracVerificationDto,
  ): Promise<FintracVerification> {
    try {
      return await this.fintracVerificationService.create(
        id,
        fintracVerificationDto,
      );
    } catch (error) {
      console.error(error);
      throw new NotAcceptableException(
        "Fintrac verification couldn't be added to the contact",
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFintracVerificationDto: FintracVerificationDto,
  ): Promise<FintracVerification> {
    return await this.fintracVerificationService.update(
      id,
      updateFintracVerificationDto,
    );
  }
}
