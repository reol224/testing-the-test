import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class InformationGuide {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact)
  @JoinColumn({ name: 'client_id' })
  client: Contact;

  @Column({ name: 'client_requirement_id' })
  client_requirement_id: number;

  @Column({
    type: 'enum',
    enum: ['sent', 'signed', 'expired'],
  })
  status: 'sent' | 'signed' | 'expired';

  @Column({ nullable: true })
  document_id: number;
}
