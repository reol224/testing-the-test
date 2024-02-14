import { Body, Controller, Delete, Get, NotAcceptableException, Param, Patch, Post } from '@nestjs/common';
import { ContractService } from '../../services/contract.service';
import { ContractDto } from '../dtos/contract.dto';
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post(':id')
  async add(
    @Param('id') id: number,
    @Body() contractDto: ContractDto,
  ): Promise<ContractDto> {
    try {
      return await this.contractService.add(id, contractDto);
    } catch (error) {
      console.error(error);
      throw new NotAcceptableException(
        "Contract couldn't be added to the contact",
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.contractService.delete(id);
  }
}
