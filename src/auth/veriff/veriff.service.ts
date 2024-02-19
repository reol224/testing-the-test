import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Utility } from './utility';

@Injectable()
export class VeriffService {
  private readonly secretSharedKey: string;
  private sessionId: string;

  constructor() {
    this.secretSharedKey = process.env.VERIFF_SHARED_SECRET_KEY || '';
  }

  /*
  Send end-user's media

Using the session ID, pass the end-user's media (face, document front, document back, etc.) by uploading all images (and video if applicable) one by one using the POST request to sessions/{sessionId}/media endpoint.
The goal here is to upload the required photos and associate them with the verification created in step 1.

Take advantage of the additional collected data

In order to further improve the IDV process, we strongly recommend you collect some additional end-user data and send it to us via POST /sessions/{sessionId}/collected-data.
This step is not mandatory, but it is highly recommended.

Submit session for review

Once all the media and additional data has been uploaded, you then submit the verification session by sending the PATCH request to PATCH /sessions/{sessionId} and marking the verification to submitted status.
Make sure that all the media has been submitted prior to triggering the PATCH request.
   */
  async initiateVerification(): Promise<any> {
    const url = 'https://stationapi.veriff.com/v1/sessions/';
    const data = {
      verification: {
        callback: 'https://veriff.com',
        person: {
          firstName: 'Nican Onio',
          lastName: 'Xander',
          idNumber: '001-1505561-1',
        },
        document: {
          number: 'VL0199336',
          type: 'PASSPORT',
          country: 'DO',
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
      'X-HMAC-SIGNATURE': Utility.generateHmacSignature(
        data,
        this.secretSharedKey,
      ),
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
    console.log('sessionId: ' + this.sessionId);

    if (!this.sessionId) {
      await this.initiateVerification();
    }

    const url =
      'https://stationapi.veriff.com/v1/sessions/' + this.sessionId + '/media';

    const data = {
      image: {
        context: file.originalname.split('.')[0], //face, document-front, document-back
        content: Utility.readImage(
          process.env.VERIFF_IMAGE_DIR + '/' + file.originalname,
        ),
      },
    };

    console.log(
      'File: ' + process.env.VERIFF_IMAGE_DIR + '/' + file.originalname,
    );

    const headers = {
      'Content-Type': 'application/json',
      'X-AUTH-CLIENT': process.env.VERIFF_API_KEY,
      'X-HMAC-SIGNATURE': Utility.generateHmacSignature(
        data,
        this.secretSharedKey,
      ),
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

  async submit() {
    const url = 'https://stationapi.veriff.com/v1/sessions/' + this.sessionId;

    const data = {
      verification: {
        status: 'submitted',
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-AUTH-CLIENT': process.env.VERIFF_API_KEY,
      'X-HMAC-SIGNATURE': Utility.generateHmacSignature(
        data,
        this.secretSharedKey,
      ),
    };

    try {
      const response = await axios.patch(url, JSON.stringify(data), {
        headers,
      });
      console.log(response.status);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async validateRegistry(): Promise<any> {
    const url = 'https://stationapi.veriff.com/v1/validate-registry';

    const data = {
      verification: {
        callback: 'https://veriff.com',
        person: {
          idNumber: '001-1505561-1',
          fullName: 'Nican Xander', // Provide either fullName or firstName + lastName
          // firstName: 'Nican', // Uncomment if not providing fullName
          // lastName: 'Xander', // Uncomment if not providing fullName
          dateOfBirth: '2000-01-01',
        },
        address: {
          fullAddress: 'Lorem Ipsum 30, 13612 Tallinn, Estonia', // Provide either fullAddress or street + houseNumber + postcode
          // street: 'Lorem Ipsum', // Uncomment if not providing fullAddress
          // houseNumber: '30', // Uncomment if not providing fullAddress
          // postcode: '13612', // Uncomment if not providing fullAddress
        },
        vendorData: '11111111',
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-AUTH-CLIENT': process.env.VERIFF_API_KEY,
      'X-API-KEY': process.env.VERIFF_API_KEY,
      'X-HMAC-SIGNATURE': Utility.generateHmacSignature(
        data,
        this.secretSharedKey,
      ),
    };

    try {
      const response = await axios.post(url, data, { headers });
      console.log(response.status);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
      throw error;
    }
  }
}
