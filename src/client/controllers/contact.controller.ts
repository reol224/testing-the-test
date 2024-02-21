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
import { Contact, ContactTypeEnum } from '../entities/contact.entity';
import { ContactDto } from '../dtos/contact.dto';
import { TypedBody, TypedException, TypedParam, TypedRoute } from '@nestia/core';
import { TypeGuardError } from 'typia';
import { IdentityDto } from '../dtos/identity.dto';
import { Identity } from '../entities/identity.entity';
import { IdentityService } from '../../services/identity.service';
import { MemberDto } from '../dtos/member.dto';
import { MemberService } from '../../services/member.service';

type Paginated<T> = {
  success: boolean;
  data: T[];
};

@Controller('contact')
export class ContactController {
  constructor(private readonly clientService: ContactService, private readonly identityService: IdentityService, private readonly memberService: MemberService) {
  }

  @TypedRoute.Get()
  async get(): Promise<Paginated<ContactDto.Root>> {
    return await this.clientService.getClients().then((d) => {
      return {
        success: true,
        data: d.map((c) => {
          return ContactDto.createFromEntities(c);
        }),
      };
    });
  }

  @TypedRoute.Get(':id')
  @TypedException<TypeGuardError>(404, 'Contact not found')
  async findOneById(@TypedParam('id') id: number): Promise<ContactDto.Root> {
    return this.clientService
      .findOneById(id)
      .then((d) => ContactDto.createFromEntities(d[0]));
  }

  @TypedRoute.Post('/createIndividual')
  async add(
    @TypedBody() body: ContactDto.UpdateRequest,
  ): Promise<ContactDto.Root> {
    return this.clientService
      .create(ContactTypeEnum.individual, body)
      .then((d) => ContactDto.createFromEntities(d));
  }

  @TypedRoute.Post('/createGroup')
  async addGroup(
    @TypedBody() body: ContactDto.UpdateRequest,
  ): Promise<ContactDto.Root> {
    return this.clientService
      .create(ContactTypeEnum.group, body)
      .then((d) => ContactDto.createFromEntities(d));
  }

  @TypedRoute.Post(':id/identity')
  async addIdentity(
    @Param('id') id: number,
    @Body() createIdentityDto: IdentityDto,
  ): Promise<Identity> {
    return await this.identityService.create(id, createIdentityDto);
  }

  @TypedRoute.Post(':id/member')
  async addMember(
    @Param('id') id: number,
    @Body() memberDto: MemberDto[],
  ): Promise<MemberDto[]> {
    try {
      return await this.memberService.add(id, memberDto);
    } catch (error) {
      console.error(error);
      throw new NotAcceptableException(
        'Members couldn\'t be added to the contact',
      );
    }
  }

  @TypedRoute.Patch(':id')
  async update(
    @TypedParam('id') id: number,
    @TypedBody() updateClientDto: ContactDto.UpdateRequest,
  ): Promise<Contact> {
    return await this.clientService.updateClient(id, updateClientDto);
  }

  @TypedRoute.Patch(':id/identity')
  async updateIdentity(
    @Param('id') id: number,
    @Body() updateIdentityDto: IdentityDto,
  ): Promise<Identity> {
    return await this.identityService.update(id, updateIdentityDto);
  }

  @TypedRoute.Delete(':id')
  async remove(@TypedParam('id') id: number): Promise<void> {
    const clientToRemove = await this.clientService.findOneById(id);

    if (!clientToRemove) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    await this.clientService.remove(id);
  }

  @TypedRoute.Delete(':id/identity')
  async removeIdentity(@Param('id') id: number): Promise<void> {
    await this.identityService.delete(id);
  }

  @TypedRoute.Delete(':id/member')
  async deleteMember(@Param('id') id: number): Promise<void> {
    await this.memberService.delete(id);
  }
}
