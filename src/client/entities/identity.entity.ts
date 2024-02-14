import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class Identity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Contact, (contact) => contact.identity)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @Column()
  fullname?: string;

  @Column()
  first_name: string;

  @Column({nullable: true})
  last_name?: string;

  @Column({nullable: true})
  address_full?: string;

  @Column({nullable: true})
  address?: string;

  @Column({nullable: true})
  city?: string;

  @Column({nullable: true})
  province?: string;

  @Column({nullable: true})
  country?: string;

  @Column({nullable: true})
  postal_code?: string;

  @Column({nullable: true})
  doc_type?: string;

  @Column({nullable: true})
  doc_number?: string;

  @Column({nullable: true})
  doc_expire?: string;

  @Column({nullable: true})
  doc_province?: string;

  @Column({nullable: true})
  doc_country?: string;

  @Column({
    type: 'enum',
    enum: ['driverlicense', 'passport', 'other'],
    default: 'other',
  })
  type: 'driverlicense' |'passport' | 'other';

  @Column({
    type: 'enum',
    enum: ['incomplete', 'complete'],
    default: 'incomplete',
  })
  status: 'incomplete' | 'complete';

  @Column({
    type: 'enum',
    enum: ['remote', 'scan', 'manual'],
  })
  source?: 'remote' | 'scan' | 'manual';
}
