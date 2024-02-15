import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Contact, (contact) => contact.contract)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @Column({ nullable: true })
  label?: string;

  @Column({ type: 'date', nullable: true })
  commence_date?: Date;

  @Column({ type: 'date', nullable: true })
  expire_date?: Date;

  @Column({ nullable: true })
  holdover_days?: number;

  @Column({ nullable: true })
  location_area?: string;

  @Column({ nullable: true })
  property_description?: string;

  @Column({ nullable: true })
  commission?: string;

  @Column({ nullable: true })
  commission_notes?: string;

  @Column({
    type: 'enum',
    enum: ['buyer', 'seller'],
  })
  type: 'buyer' | 'seller';

  @Column({
    type: 'enum',
    enum: ['active', 'expired', 'archived'],
  })
  status: 'active' | 'expired' | 'archived';

  @Column({ nullable: true })
  listing_price?: string;

  @Column({ nullable: true })
  solicitation?: boolean;

  @Column({ nullable: true })
  coop_commission?: string;

  @Column({ nullable: true })
  coop_com_notes?: string;
}
