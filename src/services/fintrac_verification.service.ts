import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../client/entities/contact.entity';
import { FintracVerification } from '../client/entities/fintrac_verification.entity';
import { FintracVerificationDto } from '../client/dtos/fintrac_verification.dto';

@Injectable()
export class FintracVerificationService {
  constructor(
    @InjectRepository(FintracVerification)
    private readonly fintracVerificationRepository: Repository<FintracVerification>,

    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(
    contactId: number,
    fintracVerificationDto: FintracVerificationDto,
  ): Promise<FintracVerification> {
    const contact = await this.contactRepository.findOne({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        type: true,
      },
      where: { id: contactId },
      relations: ['fintrac_verification'],
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${contactId} not found`);
    }

    const fintracVerification = this.fintracVerificationRepository.create({
      ...fintracVerificationDto,
      contact: contact,
    });

    return await this.fintracVerificationRepository.save(fintracVerification);
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
