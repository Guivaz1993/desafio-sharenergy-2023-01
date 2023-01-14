import { User } from '@application/entities/users/user';

export class UserViewModel {
  static toHttp(user: User) {
    return {
      id: user.id,
      username: user.username,
      password: user.password.value,
    };
  }
}
