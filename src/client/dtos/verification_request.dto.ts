import { AbstractDto } from '../../abstract/abstract.dto';
import { AbstractEntity } from '../../abstract/abstract.entity';
import { OptionPredicator } from 'typia/lib/programmers/helpers/OptionPredicator';
import { VerificationRequest } from '../entities/verification_request.entity';

export namespace VerificationRequestDto {
  // contact_id: number;
  // provider_id?: boolean;
  // reference?: boolean;
  // status?: 'sent' | 'expired' | 'completed';
  // completed_at?: Date;
  // created_at?: Date;
  // expire_at?: Date;

  import undefined = OptionPredicator.undefined;

  export class Root extends AbstractDto {
    key?: string;
    provider_id?: boolean;
    reference?: boolean;
    status?: 'sent' | 'expired' | 'completed';
    completed_at?: Date;
    created_at?: Date;
    expire_at?: Date;

    getEntity(): AbstractEntity {
      const entity = new VerificationRequest();
      entity.id = parseInt(this.key ?? '');
      entity.provider_id = this.provider_id ?? false;
      entity.reference = this.reference ?? false;
      entity.status = this.status;
      entity.completed_at = this.completed_at;
      entity.created_at = this.created_at;
      entity.expire_at = this.expire_at;
      return entity;
    }
  }

  export function createFromEntities(entity: VerificationRequest, options?: any) {
    const dto: Root = new Root();
    dto.key = entity.id.toString();
    dto.provider_id = entity.provider_id;
    dto.reference = entity.reference;
    dto.status = entity.status;
    dto.completed_at = entity.completed_at;
    dto.created_at = entity.created_at;
    dto.expire_at = entity.expire_at;
    return dto;
  }
}


