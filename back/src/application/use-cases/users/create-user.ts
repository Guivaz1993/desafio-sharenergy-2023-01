import { Injectable } from '@nestjs/common';
import { Password } from '../../entities/users/password';
import { User } from '../../entities/users/user';
import { UserRepository } from '../../repositories/users-repository';

interface CreateUserRequest {
  username: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { username, password } = request;

    const user = new User({
      username,
      password: new Password(password),
    });

    await this.userRepository.create(user);

    return { user };
  }
}
