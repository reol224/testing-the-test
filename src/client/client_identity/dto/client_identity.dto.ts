// client-identity.dto.ts

export class ClientIdentityDto {
  client_id: number;
  method: 'photoid' | 'credit' | 'remote' | 'other';
  status: 'verified' | 'rejected' | 'manually_verified' | 'missing';
  other_method?: string;
  other_requested_at?: Date;
  notes?: string;
  doc_expiry_at?: Date;
  doc_issue_at?: Date;
  doc_type?: string;
  doc_number?: string;
  doc_state?: string;
  doc_country?: string;
  doc_front_photo_id?: number;
  doc_back_photo_id?: number;
  credit_bureau_name?: string;
  credit_reference_number?: string;
  risk_score?: number;
  risk_labels?: string[];
  updated_at?: Date;
}
