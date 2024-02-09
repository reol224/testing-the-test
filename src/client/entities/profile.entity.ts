import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact)
  @JoinColumn({ name: 'client_id' })
  client: Contact;

  @Column({ unique: true })
  client_id: number;

  @Column({ nullable: true })
  profile_id: number;

  @Column({
    type: 'enum',
    enum: ['sent', 'accepted', 'declined'],
  })
  status: 'sent' | 'accepted' | 'declined';

  @Column()
  code: string;

  @Column()
  sender_profile_id: number;

  @Column({ type: 'timestamp', nullable: true })
  sent_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;
}
