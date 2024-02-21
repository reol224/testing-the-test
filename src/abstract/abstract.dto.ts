import { AbstractEntity } from './abstract.entity';

export abstract class AbstractDto {
  constructor(data?: AbstractEntity) {
    if (data) {
      Object.assign(this, data);
    }
  }

  abstract getEntity(): AbstractEntity;

  static createFromEntities(entity: AbstractEntity, options: any) {
    throw new Error('method not implemented');
  }
}