import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Identity } from '../client/entities/identity.entity';
import { IdentityDto } from '../client/dtos/identity.dto';
import { Contact } from '../client/entities/contact.entity';

@Injectable()
export class ContactIdentityService {
  constructor(
    @InjectRepository(Identity)
    private readonly clientIdentityRepository: Repository<Identity>,

    @InjectRepository(Contact)
    private readonly clientRepository: Repository<Contact>,
  ) {}

  // async create(
  //   createClientIdentityDto: IdentityDto,
  // ): Promise<Identity> {
  //   if (
  //     !createClientIdentityDto.status ||
  //     createClientIdentityDto.status !== 'rejected'
  //   ) {
  //     createClientIdentityDto.status = 'missing';
  //   }
  //
  //   const client = await this.clientRepository.findOneBy({
  //     id: createClientIdentityDto.contact_id,
  //   });
  //
  //   const clientIdentity = this.clientIdentityRepository.create({
  //     ...createClientIdentityDto,
  //     status: createClientIdentityDto.status || 'missing',
  //   });
  //   return this.clientIdentityRepository.save(clientIdentity);
  // }

  async update(
    id: number,
    updateClientIdentityDto: IdentityDto,
  ): Promise<Identity> {
    const existingClientIdentity =
      await this.clientIdentityRepository.findOneBy({ id: id });

    if (!existingClientIdentity) {
      throw new NotFoundException(`ClientIdentity with ID ${id} not found`);
    }

    const updatedClientIdentity = this.clientIdentityRepository.merge(
      existingClientIdentity,
      updateClientIdentityDto,
    );

    return this.clientIdentityRepository.save(updatedClientIdentity);
  }

  async findById(id: number): Promise<Identity | null> {
    return this.clientIdentityRepository.findOneBy({ id: id });
  }
}
