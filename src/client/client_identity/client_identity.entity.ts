import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Client } from '../client.entity';

@Entity()
export class ClientIdentity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, { nullable: true })
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column({
        type: 'enum',
        enum: ['photoid', 'credit', 'remote', 'other'],
    })
    method: 'photoid' | 'credit' | 'remote' | 'other';

    @Column({
        type: 'enum',
        enum: ['verified', 'rejected', 'manually_verified', 'missing'],
        default: 'missing',
    })
    status: 'verified' | 'rejected' | 'manually_verified' | 'missing';

    @Column({ nullable: true })
    other_method: string;

    @Column({ nullable: true })
    other_requested_at: Date;

    @Column({ nullable: true })
    notes: string;

    @Column({ nullable: true })
    doc_expiry_at: Date;

    @Column({ nullable: true })
    doc_issue_at: Date;

    @Column({ nullable: true })
    doc_type: string;

    @Column({ nullable: true })
    doc_number: string;

    @Column({ nullable: true })
    doc_state: string;

    @Column({ nullable: true })
    doc_country: string;

    @Column({ nullable: true })
    doc_front_photo_id: number;

    @Column({ nullable: true })
    doc_back_photo_id: number;

    @Column({ nullable: true })
    credit_bureau_name: string;

    @Column({ nullable: true })
    credit_reference_number: string;

    @Column({ nullable: true })
    risk_score: number;

    @Column({ nullable: true, type: 'json' })
    risk_labels: string[];

    @Column({ nullable: true })
    updated_at: Date;
}