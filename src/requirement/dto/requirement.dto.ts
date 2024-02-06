import { ClientDto } from '../../client/dto/client.dto';

export class RequirementDto {
  id: number;
  client: ClientDto;
  status: 'pending' | 'completed' | 'checked';
  label: string;
  requirement_type_id: number;
  completed_at?: Date;
  started_at?: Date;
}
