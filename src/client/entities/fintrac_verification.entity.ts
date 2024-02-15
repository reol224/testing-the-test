import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class FintracVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Contact, (contact) => contact.fintrac_verification, {
    nullable: true,
  })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

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
