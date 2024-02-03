// client.entity.ts
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: true })
    phone: string | null;
}
