import { ContactDto } from './contact.dto';

export class ContactVerificationHistoryDto {
  id: number;
  client: ContactDto;
  type: 'match' | 'warning' | 'sanction' | 'fitness' | 'pep' | 'adverse';
  label: string;
  value: string;
  source_date: string;
}
