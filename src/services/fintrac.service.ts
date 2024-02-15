import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../client/entities/contact.entity';
import { Fintrac } from '../client/entities/fintrac.entity';
import { FintracDto } from '../client/dtos/fintrac.dto';

@Injectable()
export class FintracService {
  constructor(
    @InjectRepository(Fintrac)
    private readonly fintracRepository: Repository<Fintrac>,

    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async add(
    contactId: number,
    fintracDtos: FintracDto | FintracDto[],
  ): Promise<Fintrac[]> {
    const contacts = await this.contactRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        type: true,
      },
      where: { id: contactId },
      relations: ['fintracs'],
    });

    if (!contacts || contacts.length === 0) {
      throw new NotFoundException(`Contact with ID ${contactId} not found`);
    }

    const contact = contacts[0];

    if (!contact.fintracs) {
      contact.fintracs = [];
    }

    const fintracDtosArray = Array.isArray(fintracDtos)
      ? fintracDtos
      : [fintracDtos];

    const newFintracs: Fintrac[] = [];

    for (const fintracDto of fintracDtosArray) {
      const newFintrac = this.fintracRepository.create({
        ...fintracDto,
        contact: contact,
      });

      const savedFintrac = await this.fintracRepository.save(newFintrac);
      newFintracs.push(savedFintrac);
    }

    contact.fintracs.push(...newFintracs);

    await this.contactRepository.save(contact);

    return newFintracs;
  }
  async update(fintracId: number, fintracDto: FintracDto): Promise<Fintrac> {
    const existingFintrac = await this.fintracRepository.findOneBy({
      id: fintracId,
    });

    if (!existingFintrac) {
      throw new NotFoundException(`Fintrac with ID ${fintracId} not found`);
    }

    const updatedFintrac = this.fintracRepository.merge(
      existingFintrac,
      fintracDto,
    );

    return this.fintracRepository.save(updatedFintrac);
  }
}
