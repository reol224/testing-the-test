import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Client} from "../client/client.entity";

@Entity()
export class Contract {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, (client) => client.contracts)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column({ name: 'client_requirement_id' })
    client_requirement_id: number;

    @Column({
        type: 'enum',
        enum: ['buyer', 'seller'],
    })
    type: 'buyer' | 'seller';

    @Column({ nullable: true })
    property_address: string;

    @Column({ nullable: true })
    commencing_at: Date;

    @Column({ nullable: true })
    expire_at: Date;

    @Column({ nullable: true })
    selling_price: string;

    @Column({ nullable: true })
    selling_exclusive: boolean;

    @Column({ nullable: true })
    total_commission: string;

    @Column({ nullable: true })
    buyer_commission: string;

    @Column({
        type: 'enum',
        enum: ['sent', 'active', 'expired'],
    })
    status: 'sent' | 'active' | 'expired';

    @Column({ nullable: true })
    document_id: number;
}