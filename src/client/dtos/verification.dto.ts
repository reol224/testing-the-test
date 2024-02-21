import { AbstractDto } from '../../abstract/abstract.dto';
import { AbstractEntity } from '../../abstract/abstract.entity';
import { Verification } from '../entities/verification.entity';

export namespace VerificationDto {
  export class Root extends AbstractDto {
    key?: string;
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

    getEntity(): AbstractEntity {
      const entity = new Verification();
      entity.id = parseInt(this.key ?? '');
      entity.photo_id_req = this.photo_id_req || false;
      entity.photo_id_pass = this.photo_id_pass || false;
      entity.selfie_req = this.selfie_req || false;
      entity.selfie_pass = this.selfie_pass || false;
      entity.watchlist_req = this.watchlist_req || false;
      entity.watchlist_pass = this.watchlist_pass || false;
      entity.status = this.status;
      entity.created_at = this.created_at || new Date();
      entity.completed_at = this.completed_at;
      entity.modified_at = this.modified_at;
      return entity;
    }
  }

  export function createFromEntities(entity: Verification, options?: any) {
    const dto: Root = new Root();
    dto.key = entity.id.toString();
    dto.photo_id_req = entity.photo_id_req;
    dto.photo_id_pass = entity.photo_id_pass;
    dto.selfie_req = entity.selfie_req;
    dto.selfie_pass = entity.selfie_pass;
    dto.watchlist_req = entity.watchlist_req;
    dto.watchlist_pass = entity.watchlist_pass;
    dto.status = entity.status;
    dto.created_at = entity.created_at;
    dto.completed_at = entity.completed_at;
    dto.modified_at = entity.modified_at;
    return dto;
  }
}
