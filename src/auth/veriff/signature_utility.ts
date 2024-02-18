import { Injectable } from '@nestjs/common';

@Injectable()
export class SignatureUtility {
  static generateHmacSignature(data: any, secretKey: string): string {
    const payload = JSON.stringify(data);
    const hmac = require('crypto').createHmac('sha256', secretKey);
    hmac.update(payload);

    return hmac.digest('hex');
  }
}