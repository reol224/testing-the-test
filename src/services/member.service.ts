// member.service.ts

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../client/entities/member.entity';
import { MemberDto } from '../client/dtos/member.dto';
import { Contact } from '../client/entities/contact.entity';


@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,

    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>
  ) {}

  async add(contactId: number, memberDtos: MemberDto | MemberDto[]): Promise<MemberDto[]> {
    const contact = await this.contactRepository.findOneBy({id: contactId});

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${contactId} not found`);
    }

    if(!contact.members){
      contact.members = [];
    }

    const memberDtosArray = Array.isArray(memberDtos) ? memberDtos : [memberDtos];

    const newMembers: Member[] = [];

    for (const memberDto of memberDtosArray) {
      const newMember = this.memberRepository.create({
        name: memberDto.name,
        email: memberDto.email,
        phone: memberDto.phone,
        contact: contact,
      });

      const savedMember = await this.memberRepository.save(newMember);
      newMembers.push(savedMember);
    }

    contact.members.push(...newMembers);

    await this.contactRepository.save(contact);

    return newMembers.map((member) => ({
      name: member.name,
      email: member.email,
      phone: member.phone,
    }));
  }
  async createMember(memberDto: MemberDto, contactId: number): Promise<Member> {
    const contact = { id: contactId };

    const newMember = this.memberRepository.create({
      ...memberDto,
      contact: contact,
    });

    return await this.memberRepository.save(newMember);
  }

  async getMembersByContactId(contactId: number): Promise<Member[]> {
    return await this.memberRepository.find({
      where: { contact: { id: contactId } },
    });
  }

  async getMemberById(memberId: number): Promise<Member | null> {
    try {
      return await this.memberRepository.findOneBy({ id: memberId });
    } catch (error) {
      return null;
    }
  }

  async updateMember(memberId: number, memberDto: MemberDto): Promise<Member> {
    const existingMember = await this.memberRepository.findOneBy({ id: memberId });

    if (!existingMember) {
      throw new NotFoundException(`Member with ID ${memberId} not found`);
    }

    const updatedMember = this.memberRepository.merge(
      existingMember,
      memberDto as Member,
    );

    return this.memberRepository.save(updatedMember);
  }

  async deleteMember(memberId: number): Promise<void> {
    const memberToRemove = await this.memberRepository.findOneBy({ id: memberId });

    if (!memberToRemove) {
      throw new NotFoundException(`Member with ID ${memberId} not found`);
    }

    await this.memberRepository.remove(memberToRemove);
  }
}
