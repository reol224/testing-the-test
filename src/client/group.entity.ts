// group.entity.ts
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.id)
  @JoinColumn()
  client: Client;

  @Column()
  name: string;

  @Column({default: 'default@example.com'})
  email: string;

  @Column({nullable: true})
  phone: string;

  @Column()
  position: string;

  @Column({ type: 'enum', enum: ['individual', 'organization', 'group'] })
  type: 'individual' | 'organization' | 'group';

  @Column()
  verified: boolean;

  @Column({
    type: 'enum',
    enum: ['remote', 'government_id', 'credit', 'other'],
  })
  verified_method: 'remote' | 'government_id' | 'credit' | 'other';

  @Column({
    type: 'enum',
    enum: ['verified', 'rejected', 'manually_verified', 'missing'],
  })
  status: 'verified' | 'rejected' | 'manually_verified' | 'missing';

  @Column({ type: 'json' })
  avatar: {
    sm: string;
    md: string;
    lg: string;
  };
  @OneToMany(() => Client, (client) => client.type)
  members?: Client[];
}
