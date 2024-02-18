import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Utility } from './utility';
import { Multer } from 'multer';


@Injectable()
export class VeriffService {
  private readonly secretSharedKey: string;
  private sessionId: string;

  constructor(){
    this.secretSharedKey = process.env.VERIFF_SHARED_SECRET_KEY || '';
  }
  async initiateVerification(): Promise<any> {
    const url = 'https://stationapi.veriff.com/v1/sessions/';
    const data = {
      verification: {
        callback: 'https://veriff.com',
        person: {
          firstName: "Nican Onio",
          lastName: "Xander",
          idNumber: "001-1505561-1",
        },
        document: {
          number: "VL0199336",
          type: "PASSPORT",
          country: "DO",
        },
        address: {
          fullAddress: 'Lorem Ipsum 30, 13612 Tallinn, Estonia',
        },
        vendorData: '11111111',
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-AUTH-CLIENT': process.env.VERIFF_API_KEY,
      'X-HMAC-SIGNATURE': Utility.generateHmacSignature(data, this.secretSharedKey),
    };

    try {
      const response = await axios.post(url, data, { headers });
      console.log(response.status);
      console.log(response.data);

      this.sessionId = response.data.verification.id;

      return response.data.json;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async uploadDocument(file: Express.Multer.File): Promise<any> {
    console.log("sessionId: " + this.sessionId);
    if(!this.sessionId){
      throw new Error('Session ID not found, please call initiateVerification first');
    }

    const url = 'https://stationapi.veriff.com/v1/sessions/' + this.sessionId + '/media';

    const data = {
      image: {
        context: file.originalname.split('.')[0], //face, document-front, document-back
        content: Utility.readImage(process.env.VERIFF_IMAGE_DIR + '/' + file.originalname),
      }
    }

    console.log("File: " + process.env.VERIFF_IMAGE_DIR + '/' + file.originalname);

    const headers = {
      'Content-Type': 'application/json',
      'X-AUTH-CLIENT': process.env.VERIFF_API_KEY,
      'X-HMAC-SIGNATURE': Utility.generateHmacSignature(data, this.secretSharedKey),
    };

    try {
      const response = await axios.post(url, JSON.stringify(data), { headers });
      console.log(response.status);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
