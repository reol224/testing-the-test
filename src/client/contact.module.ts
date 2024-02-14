import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from '../services/contact.service';
import { Identity } from './entities/identity.entity';
import { Contract } from './entities/contract.entity';
import { Fintrac } from './entities/fintrac.entity';
import { Member } from './entities/member.entity';
import { MemberController } from './controllers/member.controller';
import { MemberService } from '../services/member.service';
import { FintracRisk } from './entities/fintrac_risk.entity';
import { FintracVerification } from './entities/fintrac_verification.entity';
import { Profile } from './entities/profile.entity';
import { Verification } from './entities/verification.entity';
import { VerificationHits } from './entities/verification_hits.entity';
import { VerificationRequest } from './entities/verification_request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contact,
      Identity,
      Contract,
      Verification,
      VerificationHits,
      VerificationRequest,
      Fintrac,
      FintracRisk,
      FintracVerification,
      Member,
      Profile
    ]),
  ],
  controllers: [ContactController, MemberController],
  providers: [ContactService, MemberService],
  exports: [ContactService],
})
export class ContactModule {}
