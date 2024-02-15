import {
  Body,
  Controller,
  NotAcceptableException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FintracDto } from '../dtos/fintrac.dto';
import { Fintrac } from '../entities/fintrac.entity';
import { FintracService } from '../../services/fintrac.service';

@Controller('fintrac')
export class FintracController {
  constructor(private readonly fintracService: FintracService) {}

  @Post(':id')
  async add(
    @Param('id') id: number,
    @Body() fintracDto: FintracDto[],
  ): Promise<Fintrac[]> {
    try {
      return await this.fintracService.add(id, fintracDto);
    } catch (error) {
      console.error(error);
      throw new NotAcceptableException(
        "Fintrac couldn't be added to the contact",
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFintracDto: FintracDto,
  ): Promise<Fintrac> {
    return await this.fintracService.update(id, updateFintracDto);
  }
}
