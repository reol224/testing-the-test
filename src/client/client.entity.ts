// client.entity.ts
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RequirementEntity } from '../requirement/requirement.entity';
import { Contract } from '../contract/contract.entity';
import { Fintrac } from '../fintrac/fintrac.entity';
import { ClientVerificationHistory } from './client_verification_history/client_verification_history.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

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

  @Column({ default: false, nullable: true })
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
    default: 'missing',
  })
  status: 'verified' | 'rejected' | 'manually_verified' | 'missing';

  @Column({
    type: 'enum',
    enum: ['spouse', 'cosigner'],
    nullable: true,
  })
  partner_relationship?: 'spouse' | 'cosigner';

  @Column({
    type: 'enum',
    enum: [
      'fulltime',
      'selfemployed',
      'parttime',
      'contract',
      'retired',
      'other',
    ],
    nullable: true,
  })
  employment_status?:
    | 'fulltime'
    | 'selfemployed'
    | 'parttime'
    | 'contract'
    | 'retired'
    | 'other';

  @Column({ nullable: true })
  visible: boolean;

  @Column({ nullable: true })
  completed_percent: number;

  @Column({ nullable: true })
  avatar_image_id: string;

  @Column({ type: 'json', nullable: true })
  avatar?: {
    sm: string;
    md: string;
    lg: string;
  };

  @ManyToOne(() => Client, { nullable: true })
  @JoinColumn({ name: 'client_identity_id' })
  client_identity?: Client;

  @ManyToOne(() => Client, { nullable: true })
  @JoinColumn({ name: 'verification_id' })
  verification?: Client;

  @OneToMany(() => RequirementEntity, (requirement) => requirement.client, {
    nullable: true,
  })
  requirements?: RequirementEntity[];

  @OneToMany(() => Contract, (contract) => contract.client, { nullable: true })
  contracts?: Contract[];

  @OneToMany(() => Fintrac, (fintrac) => fintrac.client, { nullable: true })
  fintracs?: Fintrac[];

  @ManyToMany(() => Client)
  @JoinTable()
  members: Client[];

  @OneToMany(() => ClientVerificationHistory, (history) => history.client, {
    nullable: true,
  })
  verification_history?: ClientVerificationHistory[];
}
