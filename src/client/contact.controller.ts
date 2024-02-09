import {
  Body,
  Controller,
  Delete,
  Get, HttpException, HttpStatus,
  NotAcceptableException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ContactService } from '../services/contact.service';
import { Contact } from './entities/contact.entity';
import { ContactDto } from './dtos/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly clientService: ContactService) {}

  @Get()
  async getClients(): Promise<Contact[]> {
    return await this.clientService.getClients();
  }
  @Post()
  async addClient(@Body() createClientDto: ContactDto): Promise<Contact> {
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
    @Body() updateClientDto: ContactDto,
  ): Promise<Contact> {
    return await this.clientService.updateClient(id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const clientToRemove = await this.clientService.findOneById(id);

    if (!clientToRemove) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    await this.clientService.remove(id);
  }

  @Post('/group')
  async addGroup(@Body() createGroupDto: ContactDto): Promise<Contact> {
    createGroupDto.type = 'group';
    return await this.clientService.createGroup(
      createGroupDto
    );
  }

  @Post('/org')
  async addOrg(@Body() createOrgDto: ContactDto): Promise<Contact> {
    return await this.clientService.createOrg(
      createOrgDto
    );
  }
  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Contact | null> {
      const client = await this.clientService.findOneById(id);

      if (!client) {
        throw new HttpException(`Client with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }

      return client;
    }

}
