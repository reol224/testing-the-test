import { Body, Controller, NotAcceptableException, Param, Patch, Post } from '@nestjs/common';
import { FintracRiskService } from '../../services/fintrac_risk.service';
import { FintracRiskDto } from '../dtos/fintrac_risk.dto';
import { FintracRisk } from '../entities/fintrac_risk.entity';

@Controller('fintracrisk')
export class FintracRiskController {
  constructor(private readonly fintracRiskService: FintracRiskService) {
  }

  @Post(':id')
  async add(
    @Param('id') id: number,
    @Body() fintracRiskDto: FintracRiskDto,
  ): Promise<FintracRisk> {
    try {
      return await this.fintracRiskService.create(id, fintracRiskDto);
    } catch (error) {
      console.error(error);
      throw new NotAcceptableException(
        'Fintrac couldn\'t be added to the contact',
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFintracRiskDto: FintracRiskDto,
  ): Promise<FintracRisk> {
    return await this.fintracRiskService.update(id, updateFintracRiskDto);
  }
}
