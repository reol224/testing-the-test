export class ContractDto {
  contact_id: number;
  label?: string;
  commence_date?: Date;
  expire_date?: Date;
  holdover_days?: number;
  location_area?: string;
  property_description?: string;
  commission?: string;
  commission_notes?: string;
  type: 'buyer' | 'seller';
  status: 'active' | 'expired' | 'archived';
  listing_price?: string;
  solicitation?: boolean;
  coop_commission?: string;
  coop_com_notes?: string;
}
