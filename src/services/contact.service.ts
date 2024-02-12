// contact.service.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../client/entities/contact.entity';
import { ContactDto } from '../client/dtos/contact.dto';
import { ContactIdentity } from '../client/entities/contact_identity.entity';
import { RequirementEntity } from '../client/entities/requirement.entity';
import { Contract } from '../client/entities/contract.entity';
import { ContactIdentityDto } from '../client/dtos/contact_identity.dto';
import { RequirementDto } from '../client/dtos/requirement.dto';
import { ContractDto } from '../client/dtos/contract.dto';
import { FintracDto } from '../client/dtos/fintrac.dto';
import { Fintrac } from '../client/entities/fintrac.entity';
import { VerificationHistory } from '../client/entities/verification_history.entity';
import { ContactVerificationHistoryDto } from '../client/dtos/contact_verification_history.dto';
import { MemberDto } from '../client/dtos/member.dto';
import { Member } from '../client/entities/member.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    @InjectRepository(ContactIdentity)
    private readonly contactIdentityRepository: Repository<ContactIdentityDto>,
    @InjectRepository(RequirementEntity)
    private readonly requirementRepository: Repository<RequirementDto>,
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<ContractDto>,
    @InjectRepository(VerificationHistory)
    private readonly contactVerificationHistoryRepository: Repository<ContactVerificationHistoryDto>,
    @InjectRepository(Fintrac)
    private readonly fintracRepository: Repository<FintracDto>,
  ) {
  }

  async create(createClientDto: ContactDto): Promise<Contact> {
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

    const contact = this.contactRepository.create({
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

      client_identity: data.client_identity
        ? this.contactIdentityRepository.create(data.client_identity)
        : undefined,

      //verification: data.verification ? this.clientRepository.create(data.verification) : undefined,

      requirements: requirements ?? [],
      contracts: contracts ?? [],
      fintracs: fintracs ?? [],
      verification_history: verification_history ?? [],
    });

    return this.contactRepository.save(contact);
  }

  async createGroup(createGroupDto: ContactDto): Promise<Contact> {
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

    const group = this.contactRepository.create({
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
        ? this.contactIdentityRepository.create(client_identity)
        : undefined,
      verification: verification
        ? this.contactIdentityRepository.create(verification)
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
          this.contactVerificationHistoryRepository.create(history),
        )
        : [],
    });

    if (members && members.length > 0) {
      for (const memberDto of members) {
        const member = this.contactRepository.create(memberDto);
        const savedMember = await this.contactRepository.save(member);
        group.members.push(savedMember);
      }
    }

    return await this.contactRepository.save(group);
  }

  async createOrg(createOrgDto: ContactDto): Promise<Contact> {
    const orgDto: ContactDto = { ...createOrgDto, type: 'organization' };

    return await this.createGroup(orgDto);
  }

  async getClients(): Promise<Contact[]> {
    return await this.contactRepository.find(
      {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          type: true,
        },
        relations: ['members'],
      }
    );
  }

  async findOneById(id: number): Promise<Contact[]> {
    try {
      return await this.contactRepository.find({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          type: true,
        },
        where: { id: id },
        relations: ['members'],
      });
    } catch (error) {
      return [];
    }
  }

  async remove(id: number): Promise<void> {
    const clientToRemove = await this.contactRepository.findOneBy({ id: id });

    if (!clientToRemove) {
      throw new HttpException(
        `Client with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.contactRepository.remove(clientToRemove);
    }
  }

  async updateClient(
    id: number,
    updateClientDto: ContactDto,
  ): Promise<Contact> {
    const existingClient = await this.contactRepository.findOneBy({ id: id });

    if (!existingClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    const updatedClient = this.contactRepository.merge(
      existingClient,
      updateClientDto as Contact,
    );

    return this.contactRepository.save(updatedClient);
  }
}