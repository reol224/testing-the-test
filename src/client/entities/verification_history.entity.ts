import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class VerificationHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact, (client) => client.verification_history)
  @JoinColumn({ name: 'client_id' })
  client: Contact;

  @Column({
    type: 'enum',
    enum: ['match', 'warning', 'sanction', 'fitness', 'pep', 'adverse'],
  })
  type: 'match' | 'warning' | 'sanction' | 'fitness' | 'pep' | 'adverse';

  @Column()
  label: string;

  @Column()
  value: string;

  @Column()
  source_date: string;
}
