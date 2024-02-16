import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from './contact.entity';
import { Fintrac } from './fintrac.entity';

@Entity()
export class FintracVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Fintrac, (fintrac) => fintrac.fintrac_verification, {
    nullable: true,
  })
  @JoinColumn({ name: 'fintrac_id' })
  fintrac: Fintrac;

  @Column({
    type: 'enum',
    enum: ['doc', 'credit', 'other'],
    nullable: true,
  })
  type?: 'doc' | 'credit' | 'other';

  @Column({ nullable: true })
  credit_bureau?: string;

  @Column({ nullable: true })
  credit_reference?: string;

  @Column({ nullable: true })
  other_requested_at?: Date;

  @Column({ nullable: true })
  other_method?: string;

  @Column({ nullable: true })
  other_failed_reason?: string;
}
