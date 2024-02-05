// client.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { AppService } from '../app.service';

describe('ClientController', () => {
  let controller: ClientController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [AppService],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<AppService>(AppService);
  });
});
