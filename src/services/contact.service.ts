import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact, ContactTypeEnum } from '../client/entities/contact.entity';
import { ContactDto } from '../client/dtos/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {
  }

  async create(
    type: ContactTypeEnum,
    request: ContactDto.UpdateRequest,
  ): Promise<Contact> {
    const entity = new ContactDto.Root(request).getEntity();
    entity.type = type;

    if (type == ContactTypeEnum.company || type == ContactTypeEnum.group) {
      const members = request.members ?? [];
      const groupMembers: Contact[] = [];
      if (members && members.length > 0) {
        for (const memberDto of members) {
          console.log(memberDto);
          let member;

          if (memberDto.key) {
            member = this.contactRepository.create({
              id: parseInt(memberDto.key),
            });
          } else {
            member = this.contactRepository.create({
              name: memberDto.name,
              email: memberDto.email ?? '',
              phone: memberDto.phone ?? '',
            } satisfies Contact);
          }

          groupMembers.push(member);
        }
      }

      console.log(groupMembers);
      entity.members = groupMembers;
      console.log(entity);

    }

    return this.contactRepository.save(entity);
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

  async updateClient(id: number, request: ContactDto.UpdateRequest): Promise<Contact> {
    const existingClient = await this.contactRepository.findOneBy({ id: id });

    if (!existingClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    const updatedClient = this.contactRepository.merge(
      existingClient,
      request as any,
    );

    return this.contactRepository.save(updatedClient);
  }
}
