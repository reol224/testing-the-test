import { RequirementDto } from '../../requirement/dto/requirement.dto';
import { ContractDto } from '../../contract/dto/contract.dto';
import { FintracDto } from '../../fintrac/dto/fintrac.dto';
import { ClientVerificationHistoryDto } from '../client_verification_history/dto/client_verification_history.dto';

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
  partner_relationship?: 'spouse' | 'cosigner';
  employment_status?:
    | 'fulltime'
    | 'selfemployed'
    | 'parttime'
    | 'contract'
    | 'retired'
    | 'other';
  visible?: boolean;
  completed_percent?: number;
  avatar_image_id?: string;
  avatar?: {
    sm: string;
    md: string;
    lg: string;
  };
  client_identity?: ClientDto;
  verification?: ClientDto;
  requirements?: RequirementDto[];
  contracts?: ContractDto[];
  fintracs?: FintracDto[];
  members?: ClientDto[];
  verification_history?: ClientVerificationHistoryDto[];
}
