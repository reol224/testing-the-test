// client.service.ts
import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Client } from './client.entity';
import { ClientDto } from './dto/client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async createClient(createClientDto: ClientDto): Promise<Client> {
    const user = new Client();

    Object.assign(user, createClientDto);

    user.type = createClientDto.type || 'individual';
    user.verified = createClientDto.verified || false;
    user.verified_method = createClientDto.verified_method || 'other';
    user.status = createClientDto.status || 'missing';

    return this.clientRepository.save(user);
  }

  async createGroup(createGroupDto: ClientDto, types: 'group' | 'organization'): Promise<Client> {
    const { members, verification_history, requirements, contracts, fintracs, client_identity, verification, ...groupData } = createGroupDto;

    const group = this.clientRepository.create({
      name: groupData.name,
      type: types,
      email: groupData.email,
      phone: groupData.phone,
      address: groupData.address,
      city: groupData.city,
      province: groupData.province,
      postal_code: groupData.postal_code,
      country: groupData.country,
      employment_type: groupData.employment_type,
      employer_name: groupData.employer_name,
      industry: groupData.industry,
      position: groupData.position,
      corporation_number: groupData.corporation_number,
      operating_as: groupData.operating_as,
      corp_jurisdiction: groupData.corp_jurisdiction,
      principal_business: groupData.principal_business,
      verified: groupData.verified || false,
      verified_method: groupData.verified_method || 'other',
      status: groupData.status || 'missing',
      partner_relationship: groupData.partner_relationship,
      employment_status: groupData.employment_status,
      visible: groupData.visible,
      completed_percent: groupData.completed_percent,
      avatar_image_id: groupData.avatar_image_id,
      // client_identity: client_identity ? this.clientRepository.create(client_identity) : undefined,
      //
      // verification: verification ? this.clientRepository.create(verification) : undefined,
      // requirements: requirements ? requirements.map(req => this.clientRepository.create(req)) : [],
      // contracts: contracts ? contracts.map(contract => this.clientRepository.create(contract)) : [],
      // fintracs: fintracs ? fintracs.map(fintrac => this.clientRepository.create(fintrac)) : [],
      members: [],
      //verification_history: verification_history ? verification_history.map(history => this.clientRepository.create(history)) : [],
    });

    if (members && members.length > 0) {
      for (const memberDto of members) {
        const member = this.clientRepository.create(memberDto as DeepPartial<Client>);
        const savedMember = await this.clientRepository.save(member);
        group.members.push(savedMember);
      }
    }

    return await this.clientRepository.save(group);
  }

  // async createGroup(createGroupDto: ClientDto, types: 'group' | 'organization'): Promise<Client> {
  //   const { members, ...groupData } = createGroupDto;
  //
  //   const group = this.clientRepository.create({
  //     name: groupData.name,
  //     type: types,
  //     email: groupData.email,
  //     phone: groupData.phone,
  //     address: groupData.address,
  //     city: groupData.city,
  //     province: groupData.province,
  //     postal_code: groupData.postal_code,
  //     country: groupData.country,
  //     employment_type: groupData.employment_type,
  //     employer_name: groupData.employer_name,
  //     industry: groupData.industry,
  //     position: groupData.position,
  //     corporation_number: groupData.corporation_number,
  //     operating_as: groupData.operating_as,
  //     corp_jurisdiction: groupData.corp_jurisdiction,
  //     principal_business: groupData.principal_business,
  //     verified: groupData.verified || false,
  //     verified_method: groupData.verified_method || 'other',
  //     status: groupData.status || 'missing',
  //     avatar: groupData.avatar,
  //     members: [],
  //   });
  //
  //
  //   if (members && members.length > 0) {
  //     for (const memberDto of members) {
  //       const member = this.clientRepository.create({
  //         name: memberDto.name,
  //         email: memberDto.email,
  //         phone: memberDto.phone,
  //         address: memberDto.address,
  //         city: memberDto.city,
  //         province: memberDto.province,
  //         postal_code: memberDto.postal_code,
  //         country: memberDto.country,
  //         employment_type: memberDto.employment_type,
  //         employer_name: memberDto.employer_name,
  //         industry: memberDto.industry,
  //         position: memberDto.position,
  //         corporation_number: memberDto.corporation_number,
  //         operating_as: memberDto.operating_as,
  //         corp_jurisdiction: memberDto.corp_jurisdiction,
  //         principal_business: memberDto.principal_business,
  //         type: memberDto.type || 'individual',
  //         verified: memberDto.verified || false,
  //         verified_method: memberDto.verified_method || 'other',
  //         status: memberDto.status || 'missing',
  //         avatar: memberDto.avatar,
  //       });
  //
  //       const savedMember = await this.clientRepository.save(member);
  //       group.members.push(savedMember);
  //     }
  //   }
  //
  //
  //   return await this.clientRepository.save(group);
  // }

  async getClients(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findOneByEmail(email: string): Promise<Client | null> {
    //TODO RETURNS EVERYTHING
    return await this.clientRepository.findOneBy({email: email});
  }

  async findOneById(id: number): Promise<Client | null> {
    //TODO RETURNS EMPTY
    try {
      return await this.clientRepository.findOneBy({ id: id });
    } catch (error) {
      return null;
    }
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }

  async updateClient(id: number, updateClientDto: ClientDto): Promise<Client> {
    const existingClient = await this.clientRepository.findOneBy({ id: id});

    if (!existingClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    const updatedClient = this.clientRepository.merge(
        existingClient,
        updateClientDto as Client //TODO CHECK DEEP PARTIAL TOO,
    );

    return this.clientRepository.save(updatedClient);
  }
}
