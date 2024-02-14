export class VerificationDto {
  contact_id : number;
  photo_id_req?: boolean;
  photo_id_pass?: boolean;
  selfie_req?: boolean;
  selfie_pass?: boolean;
  watchlist_req?: boolean;
  watchlist_pass?: boolean;
  status?: 'pass' | 'warning' | 'incomplete';
  created_at?: Date;
  completed_at?: Date;
  modified_at?: Date;
}