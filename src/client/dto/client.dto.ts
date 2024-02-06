// client.client.dto.ts
export class ClientDto {
  name!: string;
  email!: string;
  phone!: string;
  address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  country?: string;
  employment_type?:
    | 'employed'
    | 'self-employed'
    | 'part time'
    | 'contract'
    | 'retired'
    | 'other';
  employer_name?: string;
  industry?: string;
  position?: string;
  corporation_number?: string;
  operating_as?: string;
  corp_jurisdiction?: string;
  principal_business?: string;
  type!: 'individual' | 'organization' | 'group';
  verified!: boolean;
  verified_method!: 'remote' | 'government_id' | 'credit' | 'other';
  status!: 'verified' | 'rejected' | 'manually_verified' | 'missing';
  avatar?: {
    sm: string;
    md: string;
    lg: string;
  };
  members?: ClientDto[];
}
