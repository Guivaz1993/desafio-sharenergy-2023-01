import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { FindUserByUsername } from '@application/use-cases/users/find-by-username-user';
import { UnauthorizedError } from './errors/unauthorized.erros';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly findUserByUsername: FindUserByUsername,
    private readonly jwtService: JwtService,
  ) {}

  login(user: any): UserToken {
    const payload: UserPayload = {
      sub: user._id,
      username: user.props.username,
    };

    const jwtToken = this.jwtService.sign(payload);
    return { access_token: jwtToken };
  }

  async validateUser(username: string, password: string) {
    const { user } = await this.findUserByUsername.execute({ username });

    if (user) {
      const isPasswordValid = await compare(password, user.password.value);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError('Nome de usuário ou senha incorreto');
  }
}
