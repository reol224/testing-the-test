import { AbstractDto } from '../../abstract/abstract.dto';
import { AbstractEntity } from '../../abstract/abstract.entity';
import { Member } from '../entities/member.entity';

export namespace MemberDto {
  export class Root extends AbstractDto {
    parent_contact?: { id: number };
    child_contact?: { id: number };
    created_at?: string;

    getEntity(): AbstractEntity {
      const entity = new Member();
      entity.parent_contact = this.parent_contact;
      entity.child_contact = this.child_contact;
      entity.created_at = this.created_at;
      return entity;
    }
  }

  export function createFromEntity(entity: Member, options?: any): Root {
    const dto: Root = new Root();
    dto.parent_contact = entity.parent_contact;
    dto.child_contact = entity.child_contact;
    dto.created_at = entity.created_at;

    return dto;
  }
}
