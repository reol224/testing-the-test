import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from '../../client.entity';

@Entity()
export class ClientIdentityWatchlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

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
