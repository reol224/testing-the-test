// client-identity.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientIdentity } from './client_identity.entity';
import { ClientIdentityService } from './client_identity.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientIdentity])],
  //controllers: [ClientIdentityController],
  providers: [ClientIdentityService],
  exports: [ClientIdentityService],
})
export class ClientIdentityModule {}
