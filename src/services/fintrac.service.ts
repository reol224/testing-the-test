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

  async create(
    contactId: number,
    fintracDtos: FintracDto.Root,
  ): Promise<Fintrac> {
    const entity = new FintracDto.Root(fintracDtos).getEntity();
    return this.fintracRepository.save(entity);
  }

  async update(fintracId: number, request: FintracDto.UpdateRequest): Promise<Fintrac> {
    const existingFintrac = await this.fintracRepository.findOneBy({
      id: fintracId,
    });

    if (!existingFintrac) {
      throw new NotFoundException(`Fintrac with ID ${fintracId} not found`);
    }

    const updatedFintrac = this.fintracRepository.merge(
      existingFintrac,
      request as any,
    );

    return this.fintracRepository.save(updatedFintrac);
  }
}
