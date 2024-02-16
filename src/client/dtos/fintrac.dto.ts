import { FintracRiskDto } from './fintrac_risk.dto';
import { FintracVerificationDto } from './fintrac_verification.dto';

export class FintracDto {
  contact_id: number;
  purpose?: string;
  purpose_notes?: string;
  purpose_other?: string;
  third_party?: boolean;
  tp_relationship?: string;
  tp_reason?: string;
  tp_name?: string;
  tp_address?: string;
  tp_occupation?: string;
  tp_corp_number?: string;
  tp_jurisdiction?: string;
  tp_dob?: string;
  pep_flagged?: boolean;
  pep_description?: string;
  fintrac_risk?: FintracRiskDto;
  fintrac_verification?: FintracVerificationDto;
}
