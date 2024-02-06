import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Client} from "../client/client.entity";

@Entity()
export class Fintrac {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, (client) => client.fintracs)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column({ name: 'client_requirement_id' })
    client_requirement_id: number;

    @Column({
        type: 'enum',
        enum: ['individual', 'organization'],
    })
    type: 'individual' | 'organization';

    @Column({ nullable: true })
    property_address: string;

    @Column({ nullable: true })
    corporation_legal_name: string;

    @Column({ nullable: true })
    director_names: string;

    @Column({ nullable: true })
    type_of_verification: string;

    @Column({ nullable: true })
    other_entity_name: string;

    @Column({ nullable: true })
    unrepresented: boolean;

    @Column({ nullable: true })
    measure_taken_other: string;

    @Column({ nullable: true })
    measure_unsuccessful_other: string;

    @Column({ nullable: true })
    third_party_transaction: boolean;

    @Column({ nullable: true })
    third_party_reason: string;

    @Column({ nullable: true })
    third_party_name: string;

    @Column({ nullable: true })
    pep_checked_at: Date;

    @Column({
        type: 'enum',
        enum: ['asked', 'internet', 'consult', 'other'],
    })
    pep_method: 'asked' | 'internet' | 'consult' | 'other';

    @Column({ nullable: true })
    pep_method_other: string;

    @Column({
        type: 'enum',
        enum: ['foreign', 'domestic', 'hio', 'none'],
    })
    pep_result: 'foreign' | 'domestic' | 'hio' | 'none';

    @Column({
        type: 'enum',
        enum: ['valid', 'expired'],
    })
    status: 'valid' | 'expired';

    @Column({ nullable: true })
    document_id: number;
}