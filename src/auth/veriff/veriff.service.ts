import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class VeriffService {
  async initiateVerification(): Promise<any> {
    const url = 'https://stationapi.veriff.com/v1/sessions/';
    const data = {
      verification: {
        callback: 'https://veriff.com',
        person: {
          firstName: 'John',
          lastName: 'Smith',
          idNumber: '123456789',
        },
        document: {
          number: 'B01234567',
          type: 'PASSPORT',
          country: 'EE',
        },
        address: {
          fullAddress: 'Lorem Ipsum 30, 13612 Tallinn, Estonia',
        },
        vendorData: '11111111',
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-AUTH-CLIENT': '',
    };

    try {
      const response = await axios.post(url, data, { headers });
      console.log(response.status);
      console.log(response.data);
      return response.data.json;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
