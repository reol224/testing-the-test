import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../entities/contact.entity';
import { ContactDto } from '../dtos/contact.dto';
import { TypedException, TypedRoute } from '@nestia/core';
import { TypeGuardError } from 'typia';

@Controller('contact')
export class ContactController {
  constructor(private readonly clientService: ContactService) {}

  @Get()
  async get(): Promise<Contact[]> {
    return await this.clientService.getClients();
  }

  @Get(':id')
  @TypedException<TypeGuardError>(404, 'Contact not found')
  async findOneById(@Param('id') id: number): Promise<Contact[]> {
    try {
      return await this.clientService.findOneById(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Client with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @TypedRoute.Post()
  async add(@Body() createClientDto: ContactDto): Promise<Contact> {
    try {
      return await this.clientService.create(createClientDto);
    } catch (error) {
      console.log(error);
      throw new NotAcceptableException("Client couldn't be created");
    }
  }

  @Post('/group')
  async addGroup(@Body() createGroupDto: ContactDto): Promise<Contact> {
    createGroupDto.type = 'group';
    return await this.clientService.create(createGroupDto);
  }

  @Patch(':id')
  async update(
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
}
