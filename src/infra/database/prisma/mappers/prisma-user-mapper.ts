import { Password } from '@application/entities/users/password';
import { User } from '@application/entities/users/user';
import { User as RawUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      password: user.password.value,
      username: user.username,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        username: raw.username,
        password: new Password(raw.password),
      },
      raw.id,
    );
  }
}
