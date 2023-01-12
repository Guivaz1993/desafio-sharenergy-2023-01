import { CreateUser } from '@application/use-cases/users/create-user';
import { FindUserByUsername } from '@application/use-cases/users/find-by-username-user';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserBody } from '../dtos/user/create-user-body';
import { UserViewModel } from '../view-models/user-niews-models';
import { hash, compare } from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(
    private createUser: CreateUser,
    private findByUsername: FindUserByUsername,
  ) {}

  @Post('create')
  async create(@Body() body: CreateUserBody) {
    const { username, password } = body;

    const { user: usedUsername } = await this.findByUsername.execute({
      username,
    });

    if (usedUsername) {
      return { message: 'Nome de usuário já utilizado' };
    }

    const encryptedPassword = await hash(password, 10);

    const { user } = await this.createUser.execute({
      username,
      password: encryptedPassword,
    });

    return { user: UserViewModel.toHttp(user) };
  }

  @Post('login')
  async login(@Body() body: CreateUserBody) {
    const { username, password } = body;

    const { user } = await this.findByUsername.execute({ username });

    const isValidPassword = await compare(password, user.password.value);

    return isValidPassword;
  }
}
