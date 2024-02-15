import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class Verification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact, (contact) => contact.verifications)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @Column({ default: false })
  photo_id_req?: boolean;

  @Column({ default: false })
  photo_id_pass?: boolean;

  @Column({ default: false })
  selfie_req?: boolean;

  @Column({ default: false })
  selfie_pass?: boolean;

  @Column({ default: false })
  watchlist_req?: boolean;

  @Column({ default: false })
  watchlist_pass?: boolean;

  @Column({
    type: 'enum',
    enum: ['pass', 'warning', 'incomplete'],
    default: 'incomplete',
  })
  status?: 'pass' | 'warning' | 'incomplete';

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  completed_at?: Date;

  @Column({ nullable: true })
  modified_at?: Date;
}
