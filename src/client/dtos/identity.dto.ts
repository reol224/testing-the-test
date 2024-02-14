export class IdentityDto {
  contact_id: number;
  fullname?: string;
  first_name?: string;
  last_name?: string;
  address_full?: string;
  address?: string;
  city?: string;
  province?: string;
  country?: string;
  postal_code?: string;
  doc_type?: string;
  doc_number?: string;
  doc_expire?: string;
  doc_province?: string;
  doc_country?: string;
  type: 'driverlicense' |'passport' | 'other';
  status: 'incomplete' | 'complete';
  source?: 'remote' | 'scan' | 'manual';
}
