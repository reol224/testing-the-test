import { Injectable } from '@nestjs/common';

@Injectable()
export class Utility {
  static generateHmacSignature(data: any, secretKey: string): string {
    const payload = JSON.stringify(data);
    const hmac = require('crypto').createHmac('sha256', secretKey);
    hmac.update(payload);

    return hmac.digest('hex');
  }

  static readImage(file: string): string {
    try {
      return require('fs').readFileSync(file).toString('base64');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
