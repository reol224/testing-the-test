import { AbstractDto } from '../../abstract/abstract.dto';
import { RandomRanger } from 'typia/lib/programmers/helpers/RandomRanger';
import { AbstractEntity } from '../../abstract/abstract.entity';
import { OptionPredicator } from 'typia/lib/programmers/helpers/OptionPredicator';
import { VerificationHits } from '../entities/verification_hits.entity';

export namespace VerificationHitsDto {
  export class Root extends AbstractDto {
    key?: string;
    verification_request_id?: number;
    type?: 'match' | 'warning' | 'sanction' | 'fitness' | 'pep' | 'adverse';
    label?: string;
    text?: string;
    source_date?: Date;

    getEntity(): AbstractEntity {
      const entity = new VerificationHits();
      entity.id = parseInt(this.key ?? '');
      entity.verification_request_id = this.verification_request_id ?? undefined;
      entity.type = this.type ?? undefined;
      entity.label = this.label ?? undefined;
      entity.text = this.text ?? undefined;
      entity.source_date = this.source_date ?? undefined;
      return entity;
    }
  }

  export function createFromEntities(entity: VerificationHits, options?: any) {
    const dto: Root = new Root();
    dto.key = entity.id.toString();
    dto.verification_request_id = entity.verification_request_id;
    dto.type = entity.type;
    dto.label = entity.label;
    dto.text = entity.text;
    dto.source_date = entity.source_date;
    return dto;
  }
}
