import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact, (contact) => contact.members)
  @JoinColumn({ name: 'contact_id' })
  parent_contact_id!: number;

  @ManyToOne(() => Contact, (contact) => contact.members)
  child_contact_id!: number;

  @Column({ nullable: true })
  created_at?: Date;

}
