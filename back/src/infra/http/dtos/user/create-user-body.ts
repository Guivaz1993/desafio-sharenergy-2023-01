import { Length, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserBody {
  @Length(3)
  @IsNotEmpty()
  @Matches(/^\S+$/, { message: 'Não pode ser utilizado espaços nos campos' })
  username: string;

  @Length(5)
  @IsNotEmpty()
  @Matches(/^\S+$/, { message: 'Não pode ser utilizado espaços nos campos' })
  password: string;
}
