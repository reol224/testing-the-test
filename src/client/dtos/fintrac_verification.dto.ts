export class FintracVerificationDto {
  contact_id: number;
  type?: 'doc' | 'credit' | 'other';
  credit_bureau?: string;
  credit_reference?: string;
  other_requested_at?: Date;
  other_method?: string;
  other_failed_reason?: string;
}