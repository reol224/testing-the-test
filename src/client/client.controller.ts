// client.controller.ts
import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { ClientDto } from './dto/client.dto';

@Controller('contact')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getClients(): Promise<Client[]> {
    return await this.clientService.getClients();
  }
  @Post()
  async addClient(@Body() createClientDto: ClientDto): Promise<Client> {
    return await this.clientService.createClient(createClientDto);
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
    return await this.clientService.createGroup(createGroupDto, createGroupDto.type);
  }

  @Post('/org')
  async addOrg(@Body() createdOrgDto: ClientDto): Promise<Client> {
    //TODO doesn't auto modify to org
    createdOrgDto.type = 'organization';
    return await this.clientService.createGroup(createdOrgDto, createdOrgDto.type);
  }


  @Get(':email')
  async findOneByEmail(@Param('email') email: string): Promise<Client | null> {
    try {
      return await this.clientService.findOneByEmail(email);
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`Client with email ${email} not found`);
    }
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
}
