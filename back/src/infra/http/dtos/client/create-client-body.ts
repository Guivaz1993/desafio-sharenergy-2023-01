import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateClientBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  zip: string;

  @IsNotEmpty()
  @Length(2, 2)
  state: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  street: string;
  number: string;
  complement: string;
}
