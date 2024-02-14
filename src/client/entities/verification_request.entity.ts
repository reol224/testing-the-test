import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class VerificationRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact, (contact) => contact.verification_request)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @Column({ nullable: true })
  provider_id?: boolean;

  @Column()
  reference?: boolean;

  @Column({
    type: 'enum',
    enum: ['sent', 'expired', 'completed'],
    nullable: true,
  })
  status?: 'sent' | 'expired' | 'completed';

  @Column({ nullable: true })
  completed_at?: Date;

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  expire_at?: Date
}