// client.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const { members, ...groupData } = createGroupDto;

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
      avatar: groupData.avatar,
      members: [],
    });


    if (members && members.length > 0) {
      for (const memberDto of members) {
        const member = this.clientRepository.create({
          name: memberDto.name,
          email: memberDto.email,
          phone: memberDto.phone,
          address: memberDto.address,
          city: memberDto.city,
          province: memberDto.province,
          postal_code: memberDto.postal_code,
          country: memberDto.country,
          employment_type: memberDto.employment_type,
          employer_name: memberDto.employer_name,
          industry: memberDto.industry,
          position: memberDto.position,
          corporation_number: memberDto.corporation_number,
          operating_as: memberDto.operating_as,
          corp_jurisdiction: memberDto.corp_jurisdiction,
          principal_business: memberDto.principal_business,
          type: memberDto.type || 'individual',
          verified: memberDto.verified || false,
          verified_method: memberDto.verified_method || 'other',
          status: memberDto.status || 'missing',
          avatar: memberDto.avatar,
        });

        const savedMember = await this.clientRepository.save(member);
        group.members.push(savedMember);
      }
    }


    return await this.clientRepository.save(group);
  }

  async getClients(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findOne(email: string): Promise<Client | null> {
    return await this.clientRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
