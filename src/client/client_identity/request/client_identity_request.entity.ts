import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from '../../client.entity';

@Entity()
export class ClientIdentityRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'provider_id' })
  provider_id: number;

  @Column({ nullable: true })
  reference_number: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'success', 'failed', 'expired', 'cancel', 'reviewing'],
  })
  status: 'pending' | 'success' | 'failed' | 'expired' | 'cancel' | 'reviewing';

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  checks: ('photoID' | 'selfie' | 'watchlist' | 'mobile')[];

  @Column({ nullable: true })
  reason: string;

  @Column({ nullable: true })
  document_used: string;

  @Column({ nullable: true })
  requested_at: Date;

  @Column({ nullable: true })
  completed_at: Date;
}
