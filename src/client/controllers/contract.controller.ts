import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ContractService } from '../../services/contract.service';
import { ContractDto } from '../dtos/contract.dto';
import { Contract } from '../entities/contract.entity';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post(':id')
  async add(
    @Param('id') id: number,
    @Body() contractDto: ContractDto,
  ): Promise<Contract> {
    try {
      return await this.contractService.add(id, contractDto);
    } catch (error) {
      console.error(error);
      throw new NotAcceptableException(
        "Contract couldn't be added to the contact",
      );
    }
  }

  @Get()
  async getAll(): Promise<Contract[]> {
    try {
      return await this.contractService.getAll();
    } catch (error) {
      console.error(error);
      throw new NotAcceptableException("Contract couldn't be found");
    }
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Contract | null> {
    try {
      return await this.contractService.getById(id);
    } catch (error) {
      console.error(error);
      throw new NotAcceptableException("Contract couldn't be found");
    }
  }
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.contractService.delete(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() contractDto: ContractDto) {
    try {
      return await this.contractService.update(id, contractDto);
    } catch (error) {
      console.error(error);
      throw new NotAcceptableException("Contract couldn't be updated");
    }
  }
}
