// client.controller.ts
import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { ClientDto } from './dto/client.dto';

@Controller('contact')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async addClient(@Body() createClientDto: ClientDto): Promise<Client> {
    return await this.clientService.createClient(createClientDto);
  }

  @Post('/group')
  async addGroup(@Body() createGroupDto: ClientDto): Promise<Client> {
    createGroupDto.type = 'group';
    return await this.clientService.createGroup(createGroupDto, createGroupDto.type);
  }

  @Post('/org')
  async addOrg(@Body() createdOrgDto: ClientDto): Promise<Client> {
    //TODO doesn't auto modify to org
    createdOrgDto.type = 'organization';
    return await this.clientService.createGroup(createdOrgDto, createdOrgDto.type);
  }

  @Get()
  async getClients(): Promise<Client[]> {
    return await this.clientService.getClients();
  }

  @Get(':email')
  async findOne(email: string): Promise<Client | null> {
    return await this.clientService.findOne(email);
  }

  @Delete(':id')
  async remove(id: number): Promise<void> {
    await this.clientService.remove(id);
  }
}
