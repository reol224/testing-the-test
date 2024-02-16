import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../client/entities/contact.entity';
import { FintracRisk } from '../client/entities/fintrac_risk.entity';
import { FintracRiskDto } from '../client/dtos/fintrac_risk.dto';
import { Fintrac } from '../client/entities/fintrac.entity';

@Injectable()
export class FintracRiskService {
  constructor(
    @InjectRepository(FintracRisk)
    private readonly fintracRiskRepository: Repository<FintracRisk>,

    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(Fintrac)
    private readonly fintracRepository: Repository<Fintrac>,
  ) {}

  async create(
    contactId: number,
    fintracRiskDto: FintracRiskDto,
  ): Promise<FintracRisk> {
    const fintrac = await this.fintracRepository.findOne({
      where: { contact: { id: contactId } },
      relations: ['fintrac_risk'],
    });

    if (!fintrac) {
      throw new NotFoundException(`Fintrac for Contact with ID ${contactId} not found`);
    }

    const fintracRisk = this.fintracRiskRepository.create({
      ...fintracRiskDto,
      fintrac: fintrac,
    });

    fintrac.fintrac_risk = fintracRisk;

    await this.fintracRepository.save(fintrac);

    return fintracRisk;
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
