import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from '../client/client.entity';

@Entity()
export class RequirementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.requirements)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({
    type: 'enum',
    enum: ['pending', 'completed', 'checked'],
  })
  status: 'pending' | 'completed' | 'checked';

  @Column()
  label: string;

  @Column({ name: 'requirement_type_id' })
  requirement_type_id: number;

  @Column({ nullable: true })
  completed_at: Date;

  @Column({ nullable: true })
  started_at: Date;
}
