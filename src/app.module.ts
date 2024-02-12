import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './client/contact.module';
import { ContactController } from './client/controllers/contact.controller';
import { AuthModule } from './auth/auth.module';

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
    ContactModule,
    AuthModule,
  ],
  controllers: [AppController, ContactController],
  providers: [AppService],
})
export class AppModule {}
