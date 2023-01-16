import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/users-repository';
import { User } from '@application/entities/users/user';

interface FindUserByUsernameRequest {
  username: string;
}

interface FindUserByUsernameResponse {
  user: User;
}

@Injectable()
export class FindUserByUsername {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: FindUserByUsernameRequest,
  ): Promise<FindUserByUsernameResponse> {
    const { username } = request;

    const user = await this.userRepository.findByUsername(username);

    return { user };
  }
}
