export class VerificationRequestDto {
  contact_id: number;
  provider_id?: boolean;
  reference?: boolean;
  status?: 'sent' | 'expired' | 'completed';
  completed_at?: Date;
  created_at?: Date;
  expire_at?: Date;
}
