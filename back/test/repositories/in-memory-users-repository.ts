import { User } from '@application/entities/users/user';
import { UserRepository } from '@application/repositories/users-repository';

export class InMemoryUserRepository implements UserRepository {
  public user: User[] = [];

  async findByUsername(username: string): Promise<User> {
    const user = this.user.find((iten) => {
      return iten.username === username;
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User) {
    this.user.push(user);
  }
}
