import { ClientDto } from '../../dto/client.dto';

export class ClientVerificationHistoryDto {
  id: number;
  client: ClientDto;
  type: 'match' | 'warning' | 'sanction' | 'fitness' | 'pep' | 'adverse';
  label: string;
  value: string;
  source_date: string;
}