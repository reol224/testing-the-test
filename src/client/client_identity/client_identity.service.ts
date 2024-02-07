// client-identity.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientIdentity } from './client_identity.entity';
import { ClientIdentityDto } from './dto/client_identity.dto';



@Injectable()
export class ClientIdentityService {
  constructor(
    @InjectRepository(ClientIdentity)
    private readonly clientIdentityRepository: Repository<ClientIdentity>,
  ) {}

  async create(createClientIdentityDto: ClientIdentityDto): Promise<ClientIdentity> {
    if (!createClientIdentityDto.status || createClientIdentityDto.status !== 'rejected') {
      createClientIdentityDto.status = 'missing';
    }

    const clientIdentity = this.clientIdentityRepository.create(createClientIdentityDto);
    return this.clientIdentityRepository.save(clientIdentity);
  }

  async update(id: number, updateClientIdentityDto: ClientIdentityDto): Promise<ClientIdentity> {
    const existingClientIdentity = await this.clientIdentityRepository.findOneBy({ id: id });

    if (!existingClientIdentity) {
      throw new NotFoundException(`ClientIdentity with ID ${id} not found`);
    }

    const updatedClientIdentity = this.clientIdentityRepository.merge(
      existingClientIdentity,
      updateClientIdentityDto,
    );

    return this.clientIdentityRepository.save(updatedClientIdentity);
  }

  async findById(id: number): Promise<ClientIdentity | null> {
    return this.clientIdentityRepository.findOneBy({ id: id });
  }
}
