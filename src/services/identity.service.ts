import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Identity } from '../client/entities/identity.entity';
import { Repository } from 'typeorm';
import { Contact } from '../client/entities/contact.entity';
import { IdentityDto } from '../client/dtos/identity.dto';

@Injectable()
export class IdentityService {
  constructor(
    @InjectRepository(Identity)
    private readonly identityRepository: Repository<Identity>,

    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(contactId: number, identityDto: IdentityDto): Promise<Identity> {
    const contact = await this.contactRepository.findOne({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        type: true,
      },
      where: { id: contactId },
      relations: ['identity'],
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${contactId} not found`);
    }

    const identity = this.identityRepository.create({
      ...identityDto,
      contact: { id: contactId },
    });

    contact.identity = identity;

    await this.contactRepository.save(contact);

    return identity;
  }
  async delete(identityId: number): Promise<void> {
    const identityToRemove = await this.identityRepository.findOneBy({
      id: identityId,
    });

    if (!identityToRemove) {
      throw new NotFoundException(
        `Identity with ID ${identityToRemove} not found`,
      );
    }

    await this.identityRepository.remove(identityToRemove);
  }

  async update(
    identityId: number,
    identityDto: IdentityDto,
  ): Promise<Identity> {
    const existingIdentity = await this.identityRepository.findOneBy({
      id: identityId,
    });

    if (!existingIdentity) {
      throw new NotFoundException(`Identity with ID ${identityId} not found`);
    }

    const updatedIdentity = this.identityRepository.merge(
      existingIdentity,
      identityDto as IdentityDto,
    );

    return this.identityRepository.save(updatedIdentity);
  }
}
