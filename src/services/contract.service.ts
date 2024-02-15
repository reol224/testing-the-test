import { Injectable, NotFoundException } from '@nestjs/common';
import { ContractDto } from '../client/dtos/contract.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from '../client/entities/contract.entity';
import { Repository } from 'typeorm';
import { Contact } from '../client/entities/contact.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async add(contactId: number, contractDto: ContractDto): Promise<Contract> {
    const contact = await this.contactRepository.findOne({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        type: true,
      },
      where: { id: contactId },
      relations: ['contract'],
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${contactId} not found`);
    }

    const existingContract = contact.contract;

    if (existingContract) {
      throw new NotFoundException(
        `Contact with ID ${contactId} already has a contract`,
      );
    }

    const newContract = this.contractRepository.create({
      ...contractDto,
      contact: {id: contactId},
    });

    contact.contract = newContract;

    await this.contactRepository.save(contact);

    return newContract;
  }

  async delete(contractId: number): Promise<void> {
    const contractToRemove = await this.contractRepository.findOneBy({
      id: contractId,
    });

    if (!contractToRemove) {
      throw new NotFoundException(`No contract with that ID`);
    }

    await this.contractRepository.remove(contractToRemove);
  }

  async update(contractId: number, contractDto: ContractDto): Promise<void> {
    const contract = await this.contractRepository.findOneBy({
      id: contractId,
    });

    if (!contract) {
      throw new NotFoundException(`No contract with that ID`);
    }

    contract.label = contractDto.label;
    contract.commence_date = contractDto.commence_date;
    contract.expire_date = contractDto.expire_date;
    contract.type = contractDto.type;
    contract.status = contractDto.status;

    await this.contractRepository.save(contract);
  }

  async getById(id: number) {
    return await this.contractRepository.findOneBy({ id });
  }

  async getAll() {
    return await this.contractRepository.find();
  }
}
