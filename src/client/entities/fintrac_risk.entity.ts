import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class FintracRisk {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Contact, (contact) => contact.fintrac_risk, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @Column({ nullable: true })
  previously_work? : boolean;

  @Column({ nullable: true })
  criminal_history? : boolean;

  @Column({ nullable: true })
  score? : number;
}