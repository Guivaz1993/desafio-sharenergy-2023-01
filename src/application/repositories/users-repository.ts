import { User } from '../entities/users/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByUsername(username: string): Promise<User | null>;
}
