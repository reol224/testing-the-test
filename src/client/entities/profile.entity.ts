import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact, (contact) => contact.profile)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;
}
