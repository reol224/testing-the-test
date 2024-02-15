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
import { Contract } from './contract.entity';
import { Fintrac } from './fintrac.entity';
import { Member } from './member.entity';
import { Profile } from './profile.entity';
import { Identity } from './identity.entity';
import { Verification } from './verification.entity';
import { VerificationRequest } from './verification_request.entity';
import { FintracRisk } from './fintrac_risk.entity';
import { FintracVerification } from './fintrac_verification.entity';
import { VerificationHits } from './verification_hits.entity';
import { MemberDto } from '../dtos/member.dto';

@Entity()
export class Contact {
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
  postal?: string;

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

  @Column({
    type: 'enum',
    enum: ['individual', 'company', 'group'],
    nullable: true,
    default: 'individual',
  })
  type: 'individual' | 'company' | 'group';

  @Column({
    type: 'enum',
    enum: ['active', 'archived'],
    default: 'active',
  })
  status: 'active' | 'archived';

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

  @OneToOne(() => Identity, (identity) => identity.id, { nullable: true, cascade: true })
  @JoinColumn({ name: 'identity_id' })
  identity?: Identity;

  @OneToMany(() => Verification, (verification) => verification.contact, { nullable: true })
  @JoinColumn({ name: 'verifications_id' })
  verifications?: Verification[];

  @OneToMany(() => VerificationRequest, (verificationRequest) => verificationRequest.contact, { nullable: true, cascade: true })
  @JoinColumn({ name: 'verification_request_id' })
  verification_request?: VerificationRequest[];

  @OneToMany(() => VerificationHits, (verificationHits) => verificationHits.contact, { nullable: true, cascade: true })
  @JoinColumn({ name: 'verification_hits_id' })
  verification_hits?: VerificationHits[];

  @OneToOne(() => Contract, (contract) => contract.id, { nullable: true, cascade: true })
  @JoinColumn({ name: 'contract_id' })
  contract?: Contract;

  @OneToMany(() => Fintrac, (fintrac) => fintrac.contact, { nullable: true, cascade: true })
  @JoinTable({ name: 'fintrac_id' })
  fintracs?: Fintrac[];

  @OneToOne(() => FintracRisk, (fintracRisk) => fintracRisk.contact, { nullable: true, cascade: true })
  @JoinColumn({ name: 'fintrac_risk_id' })
  fintrac_risk?: FintracRisk;

  @OneToOne(() => FintracVerification, (fintracVerification) => fintracVerification.contact, { nullable: true, cascade: true })
  @JoinColumn({ name: 'fintrac_verification_id' })
  fintrac_verification?: FintracVerification;

  @ManyToMany(() => Member, (member) => member.id, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  members: MemberDto[];
}
