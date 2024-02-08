// client.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { ClientDto } from './dto/client.dto';

@Controller('contact')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async addClient(@Body() createClientDto: ClientDto): Promise<Client> {
    try {
      return await this.clientService.createClient(createClientDto);
    } catch (error) {
      console.log(error);
      throw new NotAcceptableException("Client couldn't be created");
    }
  }

  @Patch(':id')
  async updateClient(
    @Param('id') id: number,
    @Body() updateClientDto: ClientDto,
  ): Promise<Client> {
    return await this.clientService.updateClient(id, updateClientDto);
  }

  @Delete(':id')
  async remove(id: number): Promise<void> {
    const clientToRemove = await this.clientService.findOneById(id);

    if (!clientToRemove) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    await this.clientService.remove(clientToRemove.id);
  }

  @Post('/group')
  async addGroup(@Body() createGroupDto: ClientDto): Promise<Client> {
    createGroupDto.type = 'group';
    return await this.clientService.createGroup(
      createGroupDto
    );
  }

  @Post('/org')
  async addOrg(@Body() createOrgDto: ClientDto): Promise<Client> {
    return await this.clientService.createOrg(
      createOrgDto
    );
  }
  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Client | null> {
    try {
      return await this.clientService.findOneById(id);
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
  }

  @Get()
  async getClients(): Promise<Client[]> {
    return await this.clientService.getClients();
  }
}
