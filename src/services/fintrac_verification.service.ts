import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../client/entities/contact.entity';
import { FintracVerification } from '../client/entities/fintrac_verification.entity';
import { FintracVerificationDto } from '../client/dtos/fintrac_verification.dto';
import { Fintrac } from '../client/entities/fintrac.entity';

@Injectable()
export class FintracVerificationService {
  constructor(
    @InjectRepository(FintracVerification)
    private readonly fintracVerificationRepository: Repository<FintracVerification>,

    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(Fintrac)
    private readonly fintracRepository: Repository<Fintrac>,
  ) {}

  async create(
    contactId: number,
    fintracVerificationDto: FintracVerificationDto,
  ): Promise<FintracVerification> {
    const fintrac = await this.fintracRepository.findOne({
      where: { contact: { id: contactId } },
      relations: ['fintrac_verification'],
    });

    if (!fintrac) {
      throw new NotFoundException(`Fintrac for Contact with ID ${contactId} not found`);
    }

    const fintracVerification = this.fintracVerificationRepository.create({
      ...fintracVerificationDto,
      fintrac: fintrac,
    });

    fintrac.fintrac_verification = fintracVerification;

    await this.fintracRepository.save(fintrac);

    return fintracVerification;
  }

  async update(
    fintracVerificationId: number,
    fintracVerificationDto: FintracVerificationDto,
  ): Promise<FintracVerification> {
    const existingFintracVerification = await this.fintracVerificationRepository.findOneBy({
      id: fintracVerificationId,
    });

    if (!existingFintracVerification) {
      throw new NotFoundException(
        `Fintrac risk with ID ${fintracVerificationId} not found`,
      );
    }

    const updatedFintracVerification = this.fintracVerificationRepository.merge(
      existingFintracVerification,
      fintracVerificationDto,
    );

    return this.fintracVerificationRepository.save(updatedFintracVerification);
  }
}
