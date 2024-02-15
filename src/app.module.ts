import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './client/contact.module';
import { ContactController } from './client/controllers/contact.controller';
import { AuthModule } from './auth/auth.module';
import { IdentityService } from './services/identity.service';
import { ContactService } from './services/contact.service';
import { Identity } from './client/entities/identity.entity';
import { Contact } from './client/entities/contact.entity';
import { Member } from './client/entities/member.entity';
import { MemberService } from './services/member.service';
import { MemberController } from './client/controllers/member.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'realtor',
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Identity, Contact, Member]),
    ContactModule,
    AuthModule,
  ],
  controllers: [AppController, ContactController, MemberController],
  providers: [AppService, IdentityService, ContactService, MemberService],
})
export class AppModule {}
