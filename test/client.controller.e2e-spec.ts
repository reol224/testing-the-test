import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ClientModule } from '../src/client/client.module';
import * as dt from 'dotenv';
import {describe, it, expect, beforeEach, afterEach, jest} from '@jest/globals';


describe('ClientController (e2e)', () => {
  let app: INestApplication;
  let createdClientId: number;

  beforeAll(async () => {
    dt.config({ path: '.env' });
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ClientModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (createdClientId) {
      console.log("Cleaning up: Deleting the created client..");
      await request(app.getHttpServer()).delete(`/contact/${createdClientId}`).expect(200);
    }

    await app.close();
  });

  it('/GET /contact', () => {
    return request(app.getHttpServer())
      .get('/contact')
      .expect(200);
  })

  it('/POST /contact', async () => {
    const createClientDto = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      address: "123 Main Street",
      city: "Techville",
      province: "Techland",
      postal_code: "12345",
      country: "Techlandia",
      employment_type: "fulltime",
      employer_name: "Tech Solutions",
      industry: "Technology",
      position: "Software Engineer",
      corporation_number: "ABC123",
      operating_as: "TechSolutions",
      corp_jurisdiction: "TechState",
      principal_business: "Tech Services",
      type: "individual",
      verified: true,
      verified_method: "remote",
      status: "verified",
      partner_relationship: "spouse",
      employment_status: "fulltime",
      visible: true,
      completed_percent: 75,
      avatar_image_id: "avatar123",
      avatar: {
        sm: "path/to/sm_avatar.jpg",
        md: "path/to/md_avatar.jpg",
        lg: "path/to/lg_avatar.jpg",
      },
      client_identity: {
        client_id: 1,
        method: "credit",
        status: "verified",
        other_method: "other",
        other_requested_at: "2024-01-01T00:00:00Z",
        notes: "Additional notes",
        doc_expiry_at: "2025-01-01T00:00:00Z",
        doc_issue_at: "2024-01-01T00:00:00Z",
        doc_type: "ID",
        doc_number: "ID123",
        doc_state: "TechState",
        doc_country: "Techlandia",
        doc_front_photo_id: 123,
        doc_back_photo_id: 456,
        credit_bureau_name: "Bureau123",
        credit_reference_number: "Ref123",
        risk_score: 80,
        risk_labels: ["High Risk"],
        updated_at: "2024-01-01T00:00:00Z",
      },
      verification: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        verified: true,
      },
      requirements: [
        {
          status: "pending",
          label: "ID Verification",
          requirement_type_id: 1,
        },
      ],
      contracts: [
        {
          client_requirement_id: 1,
          type: "buyer",
          property_address: "456 Tech Avenue",
          commencing_at: "2024-02-15T12:00:00Z",
          expire_at: "2024-03-15T12:00:00Z",
          selling_price: "500000",
          selling_exclusive: true,
          total_commission: "5%",
          buyer_commission: "2%",
          status: "active",
        },
      ],
      fintracs: [
        {
          client_requirement_id: 1,
          type: "individual",
          property_address: "456 Tech Avenue",
          corporation_legal_name: "Tech Solutions",
          director_names: "Jimmy Woe, Susan Smith",
          type_of_verification: "ID Verification",
          status: "valid",
        },
      ],
      members: [
        {
          name: "Susan Smith",
          email: "susan.smith@example.com",
          phone: "9876543210",
          position: "Lead Developer",
          type: "individual",
          verified: true,
          verified_method: "other",
          status: "verified",
        },
      ],
      verification_history: [
        {
          type: "match",
          label: "Name",
          value: "John Doe",
          source_date: "2024-02-08T10:00:00Z",
        },
      ],
    };

    const response = await request(app.getHttpServer())
      .post('/contact')
      .send(createClientDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.email).toEqual(createClientDto.email);
        expect(res.body.name).toEqual(createClientDto.name);
        createdClientId = res.body.id;
      })
  });
});
