import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    const { name, email, phone, members, ...data } = createContactDto;

    const contact = this.contactRepository.create({
      ...data,
      name,
      email,
      phone,
      members: [],
    });

    if (members && members.length > 0) {
      const createdMembers = [];

      for (const memberDto of members) {
        memberDto.parent_contact = { id:contact.id };
        memberDto.child_contact = { id:contact.id };

        const member = this.memberRepository.create(memberDto);
        const savedMember = await this.memberRepository.save(member);
        createdMembers.push(savedMember);
      }

      contact.members = createdMembers;
    }

    return this.contactRepository.save(contact);
  }

  async getClients(): Promise<Contact[]> {
    return await this.contactRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        type: true,
      },
      relations: ['members'],
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
