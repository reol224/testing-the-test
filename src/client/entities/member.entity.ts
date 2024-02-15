import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact, (contact) => contact.id)
  @JoinColumn({ name: 'contact_id' })
  parent_contact?: { id: number };

  @ManyToOne(() => Contact, (contact) => contact.members)
  child_contact?: { id: number };

  @Column({ nullable: true})
  //@CreateDateColumn()
  created_at?: string;

}
