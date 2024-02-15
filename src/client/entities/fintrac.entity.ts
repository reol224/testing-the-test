import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class Fintrac {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact, (contact) => contact.fintracs, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @Column({ nullable: true })
  purpose?: string;

  @Column({ nullable: true })
  purpose_notes?: string;

  @Column({ nullable: true })
  purpose_other?: string;

  @Column({ nullable: true })
  third_party?: boolean;

  @Column({ nullable: true })
  tp_relationship?: string;

  @Column({ nullable: true })
  tp_reason?: string;

  @Column({ nullable: true })
  tp_name?: string;

  @Column({ nullable: true })
  tp_address?: string;

  @Column({ nullable: true })
  tp_occupation?: string;

  @Column({ nullable: true })
  tp_corp_number?: string;

  @Column({ nullable: true })
  tp_jurisdiction?: string;

  @Column({ nullable: true })
  tp_dob?: string;

  @Column({ nullable: true })
  pep_flagged?: boolean;

  @Column({ nullable: true })
  pep_description?: string;
}
