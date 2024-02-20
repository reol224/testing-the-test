import { Controller, Post, Body } from '@nestjs/common';
import { WebhookHandlerService } from './webhook-handler.service';


@Controller('webhook-handler')
export class WebhookHandlerController {
  constructor(private readonly webhookService: WebhookHandlerService) {}

  @Post()
  async handleWebhook(@Body() payload: any): Promise<string> {
    try {
      const result = await this.webhookService.handle(payload);
      console.log(payload.verification.reason)
    } catch (err) {
      console.error('Webhook handler error:', err.message);
      return 'Webhook Handler Error';
    }

    return 'Webhook received successfully';
  }
}