import { Injectable } from '@nestjs/common';
import { User } from '@application/entities/users/user';
import { UserRepository } from '@application/repositories/users-repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.create({
      data: raw,
    });
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
}
