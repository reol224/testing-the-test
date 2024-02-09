import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ContactModule } from '../src/client/contact.module';
import * as dt from 'dotenv';
import {describe, it, expect, beforeEach, afterEach, jest} from '@jest/globals';
import { Contact } from '../src/client/entities/contact.entity';


describe('ContactController (e2e)', () => {
  let app: INestApplication;
  let createdClientId: number;
  let superClient: Contact

  beforeAll(async () => {
    dt.config({ path: '.env' });
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ContactModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    superClient = {
      avatar_image_id: '',
      completed_percent: 0,
      id: 0,
      members: [],
      status: 'verified',
      type: 'individual',
      verified: true,
      visible: false,
      name: "Julia",
      email: "julia@master.com",
      phone: "1234567890"
    };

    const response = await request(app.getHttpServer()).post('/contact').send(superClient);
    createdClientId = response.body.id;
  });

  afterAll(async () => {
    // if (createdClientId) {
    //   console.log("Cleaning up: Deleting the created client..");
    //   await request(app.getHttpServer()).delete(`/contact/${createdClientId}`).expect(200);
    // }

    await app.close();
  });

  it('/GET /contact', async () => {
    await request(app.getHttpServer()).get('/contact').expect(200);
  });

  it('/GET /contact/:id - Existing client', async () => {
    await request(app.getHttpServer()).get(`/contact/${createdClientId}`).expect(200);
  });

  it('/GET /contact/:id - Non-existing client', async () => {
    const nonExistingClientId = 3802874;

    const response = await request(app.getHttpServer())
      .get(`/contact/${nonExistingClientId}`)
      .expect(404)
      .catch((err) => {
        console.error('Error:', err.response);  // Log the response body in case of an error
        throw err;  // Rethrow the error to fail the test
      });

    expect(response.body.message).toEqual(`Client with ID ${nonExistingClientId} not found`);
  });


  it('/POST /contact/group - Create Group', async () => {
    const createGroupDto = {
      name: "The company of John Doe",
      verified: true,
      verified_method: "remote",
      status: "missing",
      members: [
        {
          name: "The sister of John Doe",
          email: "jdsister@example.com",
          phone: "9876543210",
          position: "Chief Vision Officer",
          type: "individual",
          verified: true,
          verified_method: "remote",
          status: "verified",
          avatar: {
            sm: "path/to/me_sm_avatar.jpg",
            md: "path/to/me_md_avatar.jpg",
            lg: "path/to/me_lg_avatar.jpg",
          },
          address: "789 Imagination Street",
          city: "Innovationtopia",
          province: "Imaginationland",
          postal_code: "54321",
          country: "Imaginationstan",
          employment_type: "fulltime",
          employer_name: "Creative Minds Inc.",
          industry: "Innovation",
          corporation_number: "ABC123",
          operating_as: "CreativeMinds",
          corp_jurisdiction: "InnovationState",
          principal_business: "Creative Innovation",
        },
        {
          name: "The brother of John Doe",
          email: "bjd@example.com",
          phone: "1234567890",
          position: "Lead Imaginator",
          type: "individual",
          verified: true,
          verified_method: "remote",
          status: "verified",
          avatar: {
            sm: "path/to/wl_sm_avatar.jpg",
            md: "path/to/wl_md_avatar.jpg",
            lg: "path/to/wl_lg_avatar.jpg",
          },
          address: "456 Imagination Avenue",
          city: "Imagination City",
          province: "Imaginationland",
          postal_code: "12345",
          country: "Imaginationstan",
          employment_type: "fulltime",
          employer_name: "Creative Minds Inc.",
          industry: "Innovation",
          corporation_number: "XYZ789",
          operating_as: "CreativeMinds",
          corp_jurisdiction: "InnovationState",
          principal_business: "Creative Innovation",
        },
      ],
      email: "johndoeinc@example.com",
      phone: "5551234567",
      address: "123 Imagination Street",
      city: "Innovation City",
      province: "Imaginationland",
      postal_code: "67890",
      country: "Imaginationstan",
      employment_type: "fulltime",
      employer_name: "Creative Minds Inc.",
      industry: "Innovation",
      position: "CEO",
      corporation_number: "XYZ456",
      operating_as: "CreativeMinds",
      corp_jurisdiction: "InnovationState",
      principal_business: "Creative Innovation",
      avatar: {
        sm: "path/to/bi_sm_avatar.jpg",
        md: "path/to/bi_md_avatar.jpg",
        lg: "path/to/bi_lg_avatar.jpg",
      },
      // client_identity: {
      //   client_id: 1,
      //   method: "credit",
      //   status: "verified",
      //   other_method: "other",
      //   other_requested_at: "2024-01-01T00:00:00Z",
      //   notes: "Additional notes",
      //   doc_expiry_at: "2025-01-01T00:00:00Z",
      //   doc_issue_at: "2024-01-01T00:00:00Z",
      //   doc_type: "ID",
      //   doc_number: "ID123",
      //   doc_state: "TechState",
      //   doc_country: "Techlandia",
      //   doc_front_photo_id: 123,
      //   doc_back_photo_id: 456,
      //   credit_bureau_name: "Bureau123",
      //   credit_reference_number: "Ref123",
      //   risk_score: 80,
      //   risk_labels: ["High Risk"],
      //   updated_at: "2024-01-01T00:00:00Z"
      // },
      // verification: {
      //   name: "John Doe",
      //   email: "john.doe@example.com",
      //   phone: "1234567890",
      //   verified: true
      // },
      // requirements: [
      //   {
      //     status: "pending",
      //     label: "ID Verification",
      //     requirement_type_id: 1
      //   }
      // ],
      // contracts: [
      //   {
      //     client_requirement_id: 1,
      //     type: "buyer",
      //     property_address: "456 Tech Avenue",
      //     commencing_at: "2024-02-15T12:00:00Z",
      //     expire_at: "2024-03-15T12:00:00Z",
      //     selling_price: "500000",
      //     selling_exclusive: true,
      //     total_commission: "5%",
      //     buyer_commission: "2%",
      //     status: "active"
      //   }
      // ],
      // fintracs: [
      //   {
      //     client_requirement_id: 1,
      //     type: "individual",
      //     property_address: "456 Tech Avenue",
      //     corporation_legal_name: "Tech Solutions",
      //     director_names: "Jimmy Woe, Susan Smith",
      //     type_of_verification: "ID Verification",
      //     status: "valid"
      //   }
      // ],
    };

    const response = await request(app.getHttpServer())
      .post('/contact/group')
      .send(createGroupDto)
      .expect(201);

    createGroupDto.name = response.body.name;
  });

  it('/POST /contact', async () => {
    const createClientDto = {
      name: "John CREATED",
      email: "john.created@example.com",
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
        name: "John CREATED",
        email: "john.created@example.com",
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
          value: "John Created",
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

  it('/DELETE /contact/:id - Existing client', async () => {
    // Assuming you have an existing client ID (replace createdClientId with a real ID)
    const createClientDto = {
      name: "John Deleted",
      email: "john.deleted@example.com",
      phone: "1234567890",
    };

    const createResponse = await request(app.getHttpServer())
      .post('/contact')
      .send(createClientDto)
      .expect(201);

    createdClientId = createResponse.body.id;

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/contact/${createResponse.body.id}`)
      .expect(200);

    expect(deleteResponse.body).toEqual({}); // Expect an empty response for successful deletion
  });

  it('/DELETE /contact/:id - Non-existing client', async () => {
    const nonExistingClientId = 3018393; // Replace with a non-existing ID

    await request(app.getHttpServer())
      .delete(`/contact/${nonExistingClientId}`)
      .expect(404)
      .expect((res) => {
        console.log(res.body);  // Log the response body for inspection
        const errorResponse = res.body;
        expect(errorResponse.message).toEqual(`Client with ID ${nonExistingClientId} not found`);
      });
  });


  it('/PATCH /contact/:id - Existing client', async () => {
    const createClientDto = {
      name: "John Patched",
      email: "john.patched@example.com",
      phone: "1234567890",
    };

    const createResponse = await request(app.getHttpServer())
      .post('/contact')
      .send(createClientDto)
      .expect(201);

    const updateClientDto = {
      name: 'John Just Got Patched',
      email: 'john.deleted@example.com',
      phone: '1234567890',
    };

    const updateResponse = await request(app.getHttpServer())
      .patch(`/contact/${createResponse.body.id}`)
      .send(updateClientDto)
      .expect(200);

    expect(updateResponse.body).toEqual(expect.objectContaining(updateClientDto));
  });

  it('/PATCH /contact/:id - Non-existing client', async () => {
    const nonExistingClientId = 9999;

    const updateClientDto = {
      name: 'John Just Got Patched A Second Time',
      email: 'john.deleted@example.com',
      phone: '1234567890',
    };

    await request(app.getHttpServer())
      .patch(`/contact/${nonExistingClientId}`)
      .send(updateClientDto)
      .expect(404)
      .expect((res) => {
        const errorResponse = res.body;
        expect(errorResponse.message).toEqual(`Client with ID ${nonExistingClientId} not found`);
      });
  });





});
