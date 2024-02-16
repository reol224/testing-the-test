import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from '../services/contact.service';
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
import { ContractController } from './controllers/contract.controller';
import { ContractService } from '../services/contract.service';
import { IdentityService } from '../services/identity.service';
import { Identity } from './entities/identity.entity';
import { IdentityController } from './controllers/identity.controller';
import { FintracController } from './controllers/fintrac.controller';
import { FintracService } from '../services/fintrac.service';
import { FintracRiskController } from './controllers/fintrac_risk.controller';
import { FintracRiskService } from '../services/fintrac_risk.service';
import { FintracVerificationController } from './controllers/fintrac_verification.controller';
import { FintracVerificationService } from '../services/fintrac_verification.service';

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
      Profile,
    ]),
  ],
  controllers: [
    ContactController,
    MemberController,
    ContractController,
    IdentityController,
    FintracController,
    FintracRiskController,
    FintracVerificationController,
  ],
  providers: [
    ContactService,
    MemberService,
    ContractService,
    IdentityService,
    FintracService,
    FintracRiskService,
    FintracVerificationService,
  ],
  exports: [ContactService],
})
export class ContactModule {}
