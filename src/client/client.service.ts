// client.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { ClientDto } from './dto/client.dto';
import { ClientIdentity } from './client_identity/client_identity.entity';
import { RequirementEntity } from '../requirement/requirement.entity';
import { Contract } from '../contract/contract.entity';
import { ClientIdentityDto } from './client_identity/dto/client_identity.dto';
import { RequirementDto } from '../requirement/dto/requirement.dto';
import { ContractDto } from '../contract/dto/contract.dto';
import { FintracDto } from '../fintrac/dto/fintrac.dto';
import { Fintrac } from '../fintrac/fintrac.entity';
import { ClientVerificationHistory } from './client_verification_history/client_verification_history.entity';
import { ClientVerificationHistoryDto } from './client_verification_history/dto/client_verification_history.dto';

@Injectable()
export class ClientService {
    constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(ClientIdentity)
    private readonly clientIdentityRepository: Repository<ClientIdentityDto>,

    @InjectRepository(RequirementEntity)
    private readonly requirementRepository: Repository<RequirementDto>,

    @InjectRepository(Contract)
    private readonly contractRepository: Repository<ContractDto>,

    @InjectRepository(ClientVerificationHistory)
    private readonly clientVerificationHistoryRepository: Repository<ClientVerificationHistoryDto>,

    @InjectRepository(Fintrac)
    private readonly fintracRepository: Repository<FintracDto>,
  ) {}

  async createClient(createClientDto: ClientDto): Promise<Client> {
    const {
      type,
      verified,
      verified_method,
      status,
      requirements,
      contracts,
      fintracs,
      verification_history,
      ...data
    } = createClientDto;

    const client = this.clientRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      province: data.province,
      postal_code: data.postal_code,
      country: data.country,
      employment_type: data.employment_type,
      employer_name: data.employer_name,
      industry: data.industry,
      position: data.position,
      corporation_number: data.corporation_number,
      operating_as: data.operating_as,
      corp_jurisdiction: data.corp_jurisdiction,
      principal_business: data.principal_business,
      type: type || 'individual',
      verified: verified || false,
      verified_method: verified_method || 'other',
      status: status || 'missing',
      partner_relationship: data.partner_relationship,
      employment_status: data.employment_status,
      visible: data.visible,
      completed_percent: data.completed_percent,
      avatar_image_id: data.avatar_image_id,
      avatar: data.avatar,

      client_identity: data.client_identity ? this.clientIdentityRepository.create(data.client_identity) : undefined,

      //verification: data.verification ? this.clientRepository.create(data.verification) : undefined,

      requirements: requirements ?? [],
      contracts: contracts ?? [],
      fintracs: fintracs ?? [],
      verification_history: verification_history ?? [],
    });

    return this.clientRepository.save(client);
  }

  async createGroup(
    createGroupDto: ClientDto
  ): Promise<Client> {
    const {
      members,
      verification_history,
      requirements,
      contracts,
      fintracs,
      client_identity,
      verification,
      ...groupData
    } = createGroupDto;

    const group = this.clientRepository.create({
      name: groupData.name,
      type: groupData.type,
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
      client_identity: client_identity
        ? this.clientIdentityRepository.create(client_identity)
        : undefined,
      verification: verification
        ? this.clientIdentityRepository.create(verification)
        : undefined,
      requirements: requirements
        ? requirements.map((req) => this.requirementRepository.create(req))
        : [],
      contracts: contracts
        ? contracts.map((contract) => this.contractRepository.create(contract))
        : [],
      fintracs: fintracs
        ? fintracs.map((fintrac) => this.fintracRepository.create(fintrac))
        : [],
      members: [],
      verification_history: verification_history
        ? verification_history.map((history) =>
            this.clientVerificationHistoryRepository.create(history),
          )
        : [],
    });

    if (members && members.length > 0) {
      for (const memberDto of members) {
        const member = this.clientRepository.create(memberDto);
        const savedMember = await this.clientRepository.save(member);
        group.members.push(savedMember);
      }
    }

    return await this.clientRepository.save(group);
  }

  async createOrg(createOrgDto: ClientDto): Promise<Client> {
    const orgDto: ClientDto = { ...createOrgDto, type: 'organization' };

    return await this.createGroup(orgDto);
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
    const existingClient = await this.clientRepository.findOneBy({ id: id });

    if (!existingClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    const updatedClient = this.clientRepository.merge(
      existingClient,
      updateClientDto as Client, //TODO CHECK DEEP PARTIAL TOO,
    );

    return this.clientRepository.save(updatedClient);
  }
}
