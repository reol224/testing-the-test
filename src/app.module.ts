// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { ClientController } from './client/client.controller';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './client/group.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'realtor',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ClientModule,
    AuthModule,
    GroupModule,
  ],
  controllers: [AppController, ClientController],
  providers: [AppService],
})
export class AppModule {}
