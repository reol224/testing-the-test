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
import { TypedBody, TypedException, TypedRoute } from '@nestia/core';
import { TypeGuardError } from 'typia';
import { IdentityDto } from '../dtos/identity.dto';
import { IdentityService } from '../../services/identity.service';
import { Identity } from '../entities/identity.entity';


@Controller('contact')
export class ContactController {
  constructor(private readonly clientService: ContactService, private readonly identityService: IdentityService) {}

  @Get()
  async get(): Promise<Contact[]> {
    return await this.clientService.getClients();
  }

  @Get(':id')
  @TypedException<TypeGuardError>(404, "Contact not found")
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

  @Post('/identity/:id')
  async addIdentity(
    @Param('id') id: number,
    @Body() createIdentityDto: IdentityDto
  ): Promise<Identity> {
    return await this.identityService.create(id,createIdentityDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClientDto: ContactDto,
  ): Promise<Contact> {
    return await this.clientService.updateClient(id, updateClientDto);
  }

  @Patch('/identity/:id')
  async updateIdentity(
    @Param('id') id: number,
    @Body() updateIdentityDto: IdentityDto,
  ): Promise<Identity> {
    return await this.identityService.update(id, updateIdentityDto);
  }
  
  @Delete('/identity/:id')
  async removeIdentity(@Param('id') id: number): Promise<void> {
    await this.identityService.delete(id);
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
