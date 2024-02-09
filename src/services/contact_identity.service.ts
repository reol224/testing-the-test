import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactIdentity } from '../client/entities/contact_identity.entity';
import { ContactIdentityDto } from '../client/dtos/contact_identity.dto';
import { Contact } from '../client/entities/contact.entity';

@Injectable()
export class ContactIdentityService {
  constructor(
    @InjectRepository(ContactIdentity)
    private readonly clientIdentityRepository: Repository<ContactIdentity>,

    @InjectRepository(Contact)
    private readonly clientRepository: Repository<Contact>,
  ) {}

  async create(
    createClientIdentityDto: ContactIdentityDto,
  ): Promise<ContactIdentity> {
    if (
      !createClientIdentityDto.status ||
      createClientIdentityDto.status !== 'rejected'
    ) {
      createClientIdentityDto.status = 'missing';
    }

    const client = await this.clientRepository.findOneBy({
      id: createClientIdentityDto.client_id,
    });

    const clientIdentity = this.clientIdentityRepository.create({
      ...createClientIdentityDto,
      status: createClientIdentityDto.status || 'missing',
    });
    return this.clientIdentityRepository.save(clientIdentity);
  }

  async update(
    id: number,
    updateClientIdentityDto: ContactIdentityDto,
  ): Promise<ContactIdentity> {
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

  async findById(id: number): Promise<ContactIdentity | null> {
    return this.clientIdentityRepository.findOneBy({ id: id });
  }
}
