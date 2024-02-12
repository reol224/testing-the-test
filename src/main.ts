import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { initializeTransactionalContext } from 'typeorm-transactional';

dotenv.config();

async function bootstrap() {
  initializeTransactionalContext();
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  console.info(`server running on ${await app.getUrl()}`);
  return app;
}

void bootstrap();
