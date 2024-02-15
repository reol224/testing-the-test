import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class VerificationHits {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact, (contact) => contact.verification_hits, {
    nullable: true,
  })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @Column({ nullable: true })
  verification_request_id: number;

  @Column({
    type: 'enum',
    enum: ['match', 'warning', 'sanction', 'fitness', 'pep', 'adverse'],
    nullable: true,
  })
  type: 'match' | 'warning' | 'sanction' | 'fitness' | 'pep' | 'adverse';

  @Column({ nullable: true })
  label?: string;

  @Column({ nullable: true })
  text?: string;

  @Column({ nullable: true })
  source_date?: Date;
}
