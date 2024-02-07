import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { ClientModule } from '../client.module';
import * as dt from 'dotenv';
import {describe, it, expect, beforeEach, afterEach, jest} from '@jest/globals';

describe('ClientController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    dt.config({ path: '.env' });
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ClientModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST /contact', async () => {
    const createClientDto = {
      // Provide necessary data for the createClientDto
      // Add the fields you want to test
      name: 'Kevin Smith',
      email: 'kevin.smith@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      city: 'Anytown',
      province: 'Province',
      postal_code: 'A1B 2C3',
      country: 'Country',
      employment_type: 'employed',
      employer_name: 'ACME Corp',
      industry: 'Tech',
      position: 'Software Developer',
      corporation_number: '123456',
      operating_as: 'ACME',
      corp_jurisdiction: 'CA',
      principal_business: 'Software Development',
      type: 'individual',
      verified: true,
      verified_method: 'remote',
      status: 'verified',
      partner_relationship: 'spouse',
      employment_status: 'fulltime',
      visible: true,
      completed_percent: 100,
      avatar_image_id: 'abc123',
      avatar: {
        sm: 'path/to/sm.jpg',
        md: 'path/to/md.jpg',
        lg: 'path/to/lg.jpg',
      },
    };

    const response = await request(app.getHttpServer())
      .post('/contact')
      .send(createClientDto)
      .expect(201);

    // Verify the response structure or specific data as needed
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toEqual(createClientDto.name);
    // ... other assertions ...
  });
});
