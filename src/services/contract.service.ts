import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ContractDto } from '../client/dtos/contract.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from '../client/entities/contract.entity';
import { Repository } from 'typeorm';
import { Contact } from '../client/entities/contact.entity';
import { Member } from '../client/entities/member.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async add(contactId: number, contractDtos: ContractDto | ContractDto[]): Promise<Contract[]> {
    const contacts = await this.contactRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        type: true,
      },
      where: { id: contactId },
      relations: ['contracts'],
    });

    if (!contacts || contacts.length === 0) {
      throw new NotFoundException(`Contact with ID ${contactId} not found`);
    }

    const contact = contacts[0];

    if (!contact.contracts) {
      contact.contracts = [];
    }

    const contractsDtosArray = Array.isArray(contractDtos)
      ? contractDtos
      : [contractDtos];

    const newContracts: Contract[] = [];

    for (const contractDto of contractsDtosArray) {
      const newContract = this.contractRepository.create({
        ...contractDto,
        contact: {id: contactId},
      });

      const savedContract = await this.contractRepository.save(newContract);
      newContracts.push(savedContract);
    }

    contact.contracts.push(...newContracts);

    await this.contactRepository.save(contact);

    return newContracts;
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
