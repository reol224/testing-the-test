import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from '../services/contact.service';
import { ContactIdentity } from './entities/contact_identity.entity';
import { RequirementEntity } from './entities/requirement.entity';
import { Contract } from './entities/contract.entity';
import { VerificationHistory } from './entities/verification_history.entity';
import { Fintrac } from './entities/fintrac.entity';
import { Member } from './entities/member.entity';
import { MemberController } from './controllers/member.controller';
import { MemberService } from '../services/member.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contact,
      ContactIdentity,
      RequirementEntity,
      Contract,
      VerificationHistory,
      Fintrac,
      Member,
    ]),
  ],
  controllers: [ContactController, MemberController],
  providers: [ContactService, MemberService],
  exports: [ContactService],
})
export class ContactModule {}
