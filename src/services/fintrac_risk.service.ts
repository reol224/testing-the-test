import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../client/entities/contact.entity';
import { FintracRisk } from '../client/entities/fintrac_risk.entity';
import { FintracRiskDto } from '../client/dtos/fintrac_risk.dto';

@Injectable()
export class FintracRiskService {
  constructor(
    @InjectRepository(FintracRisk)
    private readonly fintracRiskRepository: Repository<FintracRisk>,

    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(
    contactId: number,
    fintracRiskDto: FintracRiskDto,
  ): Promise<FintracRisk> {
    const contact = await this.contactRepository.findOne({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        type: true,
      },
      where: { id: contactId },
      relations: ['fintrac_risk'],
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${contactId} not found`);
    }

    const fintracRisk = this.fintracRiskRepository.create({
      ...fintracRiskDto,
      contact: contact,
    });

    return await this.fintracRiskRepository.save(fintracRisk);
  }

  async update(
    fintracRiskId: number,
    fintracRiskDto: FintracRiskDto,
  ): Promise<FintracRisk> {
    const existingFintracRisk = await this.fintracRiskRepository.findOneBy({
      id: fintracRiskId,
    });

    if (!existingFintracRisk) {
      throw new NotFoundException(
        `Fintrac risk with ID ${fintracRiskId} not found`,
      );
    }

    const updatedFintracRisk = this.fintracRiskRepository.merge(
      existingFintracRisk,
      fintracRiskDto,
    );

    return this.fintracRiskRepository.save(updatedFintracRisk);
  }
}
