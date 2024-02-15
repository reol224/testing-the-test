import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { IdentityService } from '../../services/identity.service';
import { IdentityDto } from '../dtos/identity.dto';
import { Identity } from '../entities/identity.entity';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post(':id')
  async addIdentity(
    @Param('id') id: number,
    @Body() createIdentityDto: IdentityDto
  ): Promise<Identity> {
    return await this.identityService.create(id,createIdentityDto);
  }
  @Patch(':id')
  async updateIdentity(
    @Param('id') id: number,
    @Body() updateIdentityDto: IdentityDto,
  ): Promise<Identity> {
    return await this.identityService.update(id, updateIdentityDto);
  }

  @Delete(':id')
  async removeIdentity(@Param('id') id: number): Promise<void> {
    await this.identityService.delete(id);
  }
}
