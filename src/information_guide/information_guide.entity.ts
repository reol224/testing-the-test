import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from '../client/client.entity';

@Entity()
export class InformationGuide {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

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
