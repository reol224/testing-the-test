// client.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from '../src/client/contact.controller';
import { ContactService } from '../src/services/contact.service';
import { ContactDto } from '../src/client/dtos/contact.dto';
import { Contact } from '../src/client/entities/contact.entity';
import {describe, it, expect, beforeEach, afterEach, jest} from '@jest/globals';

describe('ClientController', () => {
  let controller: ContactController;
  let service: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
          useValue: {
            createClient: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ContactController>(ContactController);
    service = module.get<ContactService>(ContactService);
  });

  describe('addClient', () => {
    it('should create a new client and return it', async () => {
      const createClientDto: ContactDto = {
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

      const createdClient: Contact = {
        id: 1,
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
        client_identity: undefined,
        contracts: [],
        fintracs: [],
        members: [],
        requirements: [],
        verification: undefined,
        verification_history: [],
      };

      // Mock the createClient method of the clientService
      jest.spyOn(service, 'createClient').mockResolvedValue(createdClient);

      // Call the addClient method
      const result = await controller.addClient(createClientDto);

      // Assert that the createClient method was called with the correct arguments
      expect(service.createClient).toHaveBeenCalledWith(createClientDto);

      // Assert that the result matches the expected createdClient
      expect(result).toEqual(createdClient);
    });
  });
});