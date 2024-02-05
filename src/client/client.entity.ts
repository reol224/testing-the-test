// client.entity.ts
import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, default: 'default@example.com' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string | null;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  province?: string;

  @Column({ nullable: true })
  postal_code?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  employment_type?:
    | 'employed'
    | 'self-employed'
    | 'part time'
    | 'contract'
    | 'retired'
    | 'other';

  @Column({ nullable: true })
  employer_name?: string;

  @Column({ nullable: true })
  industry?: string;

  @Column({ nullable: true })
  position?: string;

  @Column({ nullable: true })
  corporation_number?: string;

  @Column({ nullable: true })
  operating_as?: string;

  @Column({ nullable: true })
  corp_jurisdiction?: string;

  @Column({ nullable: true })
  principal_business?: string;

  @Column({
    type: 'enum',
    enum: ['individual', 'organization', 'group'],
    nullable: true,
    default: 'individual',
  })
  type: 'individual' | 'organization' | 'group';

  @Column()
  verified: boolean;

  @Column({
    type: 'enum',
    enum: ['remote', 'government_id', 'credit', 'other'],
    nullable: true,
  })
  verified_method?: 'remote' | 'government_id' | 'credit' | 'other';

  @Column({
    type: 'enum',
    enum: ['verified', 'rejected', 'manually_verified', 'missing'],
    default: 'missing' })
  status: 'verified' | 'rejected' | 'manually_verified' | 'missing';

  @Column({ type: 'json', nullable: true })
  avatar?: {
    sm: string;
    md: string;
    lg: string;
  };

  //many to many
  //@OneToMany(() => Group, (group) => group.client)
  @ManyToMany(() => Client)
  @JoinTable()
  groups: Group[];
}
