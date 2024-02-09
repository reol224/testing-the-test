import { ContactDto } from './contact.dto';

export class FintracDto {
  id: number;
  client: ContactDto;
  client_requirement_id: number;
  type: 'individual' | 'organization' | 'group';
  property_address?: string;
  corporation_legal_name?: string;
  director_names?: string;
  type_of_verification?: string;
  other_entity_name?: string;
  unrepresented?: boolean;
  measure_taken_other?: string;
  measure_unsuccessful_other?: string;
  third_party_transaction?: boolean;
  third_party_reason?: string;
  third_party_name?: string;
  pep_checked_at?: Date;
  pep_method?: 'asked' | 'internet' | 'consult' | 'other';
  pep_method_other?: string;
  pep_result?: 'foreign' | 'domestic' | 'hio' | 'none';
  status: 'valid' | 'expired';
  document_id?: number;
}
