import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  endpoint: string;

  @Column()
  path: string;

  @Column()
  mime_type: string;

  @Column()
  size: string;

  @Column()
  original_filename: string;

  @Column()
  signed: boolean;
}
