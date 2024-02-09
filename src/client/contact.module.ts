import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactController } from './contact.controller';
import { ContactService } from '../services/contact.service';
import { ContactIdentity } from './entities/contact_identity.entity';
import { RequirementEntity } from './entities/requirement.entity';
import { Contract } from './entities/contract.entity';
import { VerificationHistory } from './entities/verification_history.entity';
import { Fintrac } from './entities/fintrac.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contact,
      ContactIdentity,
      RequirementEntity,
      Contract,
      VerificationHistory,
      Fintrac,
    ]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
