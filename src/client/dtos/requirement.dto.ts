import { ContactDto } from './contact.dto';

export class RequirementDto {
  id: number;
  client: ContactDto;
  status: 'pending' | 'completed' | 'checked';
  label: string;
  requirement_type_id: number;
  completed_at?: Date;
  started_at?: Date;
}
