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
import { Member } from '../client/entities/member.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(createContactDto: ContactDto): Promise<Contact> {
    const { name, email, phone, members, type, ...data } = createContactDto;

    const contact = this.contactRepository.create({
      ...data,
      name,
      email,
      phone,
      members: [],
      type,
    });

    if (contact.type === 'group' || contact.type === 'company') {
      if (members && members.length > 0) {
        const createdMembers = [];

        for (const memberDto of members) {
          const member = this.memberRepository.create({
            ...memberDto,
            created_at: new Date().toDateString(),
            //parent_contact: contact,
          });

          const savedMember = await this.memberRepository.save(member);
          createdMembers.push(savedMember);
        }

        contact.members = createdMembers;
      }

      return await this.contactRepository.save(contact);
    } else {
      console.log('Invalid type:', contact.type);
      throw new HttpException(
        'You can only add members to groups/companies',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getClients(): Promise<Contact[]> {
    return await this.contactRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        type: true,
        members: true,
      },
      relations: [
        'members',
        'contracts',
        'identity',
        'fintracs',
        'fintracs.fintrac_risk',
        'fintracs.fintrac_verification',
      ],
    });
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
        relations: [
          'members',
          'contracts',
          'identity',
          'fintracs',
          'fintracs.fintrac_risk',
          'fintracs.fintrac_verification',
        ],
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Client with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
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
