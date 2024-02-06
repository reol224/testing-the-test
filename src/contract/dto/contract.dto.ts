import { ClientDto } from '../../client/dto/client.dto';

export class ContractDto {
  id: number;
  client: ClientDto;
  client_requirement_id: number;
  type: 'buyer' | 'seller';
  property_address?: string;
  commencing_at?: Date;
  expire_at?: Date;
  selling_price?: string;
  selling_exclusive?: boolean;
  total_commission?: string;
  buyer_commission?: string;
  status: 'sent' | 'active' | 'expired';
  document_id?: number;
}
