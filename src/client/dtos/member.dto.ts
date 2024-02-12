import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class MemberDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone!: string;
}
