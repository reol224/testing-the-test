import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageStorage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  endpoint: string;

  @Column()
  path: string;

  @Column({
    type: 'enum',
    enum: ['sm', 'md', 'lr'],
  })
  resolution: 'sm' | 'md' | 'lr';

  @Column()
  url: string;
}
