// client.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import {GroupService} from "./group.service";
import {Group} from "./group.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Client, Group])],
  controllers: [ClientController],
  providers: [ClientService, GroupService],
  exports: [ClientService],
})
export class ClientModule {}
