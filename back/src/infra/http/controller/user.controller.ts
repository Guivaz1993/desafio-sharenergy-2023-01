import { CreateUser } from '@application/use-cases/users/create-user';
import { FindUserByUsername } from '@application/use-cases/users/find-by-username-user';
import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserBody } from '../dtos/user/create-user-body';
import { UserViewModel } from '../view-models/user-views-models';
import { hash } from 'bcrypt';
import { IsPublic } from '@infra/auth/decorators/is-public.decorator';
import { CurrentUser } from '@infra/auth/decorators/current-user.decorator';
import { User } from '@application/entities/users/user';

@Controller('user')
export class UserController {
  constructor(
    private createUser: CreateUser,
    private findByUsername: FindUserByUsername,
  ) {}

  @IsPublic()
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

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
