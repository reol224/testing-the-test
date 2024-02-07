// client.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientIdentity } from './client_identity/client_identity.entity';
import { RequirementEntity } from '../requirement/requirement.entity';
import { Contract } from '../contract/contract.entity';
import { ClientVerificationHistory } from './client_verification_history/client_verification_history.entity';
import { Fintrac } from '../fintrac/fintrac.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Client,
      ClientIdentity,
      RequirementEntity,
      Contract,
      ClientVerificationHistory,
      Fintrac,
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
