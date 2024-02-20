import { Module } from '@nestjs/common';
import { WebhookHandlerController } from './webhook-handler.controller';
import { WebhookHandlerService } from './webhook-handler.service';

@Module({
  controllers: [WebhookHandlerController],
  providers: [WebhookHandlerService],
})
export class WebhookHandlerModule {}