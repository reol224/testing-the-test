export class VerificationHitsDto {
  contact_id: number;
  verification_request_id?: number;
  type?: 'match' | 'warning' | 'sanction' | 'fitness' | 'pep' | 'adverse';
  label?: string;
  text?: string;
  source_date?: Date;
}
