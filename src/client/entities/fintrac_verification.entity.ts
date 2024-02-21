import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Fintrac } from './fintrac.entity';
import { ContactTypeEnum } from './contact.entity';

export enum FintracVerificationTypeEnum {
  doc = 1,
  credit = 2,
  other = 3
}
@Entity()
export class FintracVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Fintrac, (fintrac) => fintrac.fintrac_verification, {
    nullable: true,
  })
  @JoinColumn({ name: 'fintrac_id' })
  fintrac: Fintrac;

  @Column({
    type: 'enum',
    enum: FintracVerificationTypeEnum,
    default: FintracVerificationTypeEnum.other,
  })
  type?: FintracVerificationTypeEnum;

  @Column({ nullable: true })
  credit_bureau?: string;

  @Column({ nullable: true })
  credit_reference?: string;

  @Column({ nullable: true })
  other_requested_at?: Date;

  @Column({ nullable: true })
  other_method?: string;

  @Column({ nullable: true })
  other_failed_reason?: string;
}
