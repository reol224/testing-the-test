import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from './contact.entity';
import { Fintrac } from './fintrac.entity';

@Entity()
export class FintracRisk {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Fintrac, (fintrac) => fintrac.fintrac_risk, {
    nullable: true,
  })
  @JoinColumn({ name: 'fintrac_id' })
  fintrac: Fintrac;

  @Column({ nullable: true })
  previously_work?: boolean;

  @Column({ nullable: true })
  criminal_history?: boolean;

  @Column({ nullable: true })
  score?: number;
}
