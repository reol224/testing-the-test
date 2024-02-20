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

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {
  }

  async create(createContactDto: ContactDto): Promise<Contact> {
    try {
      const { name, email, phone, members, type, ...data } = createContactDto;

      const contact = this.contactRepository.create({
        ...data,
        name,
        email,
        phone,
        members: [],
        type,
      });

      return await this.contactRepository.save(contact);
    } catch (error) {
      throw new HttpException('Couldn\'t create contact', HttpStatus.BAD_REQUEST);
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
