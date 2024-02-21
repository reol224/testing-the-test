import { VerificationRequest } from './verification_request.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Verification } from './verification.entity';
import { Identity } from './identity.entity';
import { Profile } from './profile.entity';
import { AbstractEntity } from '../../abstract/abstract.entity';
import { VerificationHits } from './verification_hits.entity';
import { Contract } from './contract.entity';
import { Fintrac } from './fintrac.entity';

export enum ContactTypeEnum {
  individual = 1,
  group = 2,
  company = 3,
}

export enum ContactStatusEnum {
  archived = 0,
  active = 1,
}

@Entity()
export class Contact extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

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
  description?: string;

  @Column({ nullable: true })
  corp_number?: string;

  @Column({ nullable: true })
  corp_legal_name?: string;

  @Column({ nullable: true })
  corp_province?: string;

  @Column({ nullable: true })
  corp_country?: string;

  @Column({ nullable: true })
  principal_business?: string;

  @Column({
    type: 'enum',
    enum: ContactTypeEnum,
    default: ContactTypeEnum.individual,
  })
  type?: ContactTypeEnum;

  @Column({
    type: 'enum',
    enum: ContactStatusEnum,
    default: ContactStatusEnum.active,
  })
  status?: ContactStatusEnum;

  @Column({ nullable: true })
  avatar_sm?: string;

  @Column({ nullable: true })
  avatar_md?: string;

  @Column({ nullable: true })
  avatar_lg?: string;

  @Column({ nullable: true })
  profile_id?: number;

  @Column({ nullable: true })
  has_completed_identity?: boolean;

  @Column({ nullable: true })
  has_active_contract?: boolean;

  @Column({ nullable: true })
  has_fintrac_score?: boolean;

  @OneToOne(() => Profile, (profile) => profile.contact, { nullable: true })
  @JoinColumn({ name: 'profile_id' })
  profile?: Profile;

  @OneToOne(() => Identity, (identity) => identity.contact, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'identity_id' })
  identity?: Identity;

  @OneToMany(() => Verification, (verification) => verification.contact, {
    nullable: true,
  })
  @JoinColumn({ name: 'verifications_id' })
  verifications?: Verification[];

  @OneToMany(
    () => VerificationRequest,
    (verificationRequest) => verificationRequest.contact,
    { nullable: true, cascade: true },
  )
  @JoinColumn({ name: 'verification_request_id' })
  verification_request?: VerificationRequest[];

  @OneToMany(
    () => VerificationHits,
    (verificationHits) => verificationHits.contact,
    { nullable: true, cascade: true },
  )
  @JoinColumn({ name: 'verification_hits_id' })
  verification_hits?: VerificationHits[];

  @OneToMany(() => Contract, (contract) => contract.contact, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'contract_id' })
  contracts?: Contract[];

  @OneToMany(() => Fintrac, (fintrac) => fintrac.contact, {
    nullable: true,
    cascade: true,
  })
  @JoinTable({ name: 'fintrac_id' })
  fintracs?: Fintrac[];

  @ManyToMany(() => Contact, (contact) => contact.members)
  groups?: Contact;

  @ManyToMany(() => Contact, (contact) => contact.groups, { cascade: true })
  @JoinTable({
    name: 'contact_group_members',
    joinColumn: {
      name: 'contact_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
  })
  members?: Contact[];
}