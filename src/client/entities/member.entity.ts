import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { IsNotEmpty, IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { Contact } from './contact.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ManyToMany(() => Contact, (contact) => contact.members)
  @JoinTable()
  contact: Contact;
}
