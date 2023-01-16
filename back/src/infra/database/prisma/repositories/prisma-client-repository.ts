import {
  Client,
  UpdateClientRequest,
} from '@application/entities/clients/client';
import { ClientRepository } from '@application/repositories/clients-repository';
import { Injectable } from '@nestjs/common';
import { PrismaClientMapper } from '../mappers/prisma-client-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private prismaService: PrismaService) {}

  async create(client: Client): Promise<Client> {
    const raw = PrismaClientMapper.toPrisma(client);

    const newClient = await this.prismaService.clients.create({
      data: raw,
    });

    return PrismaClientMapper.toDomain(newClient);
  }

  async get(id: string): Promise<Client> {
    const client = await this.prismaService.clients.findUnique({
      where: { id },
    });

    if (!client) {
      return null;
    }

    return PrismaClientMapper.toDomain(client);
  }

  async listAll(): Promise<Client[]> {
    const list = await this.prismaService.clients.findMany();

    if (list.length === 0) {
      return [];
    }

    return list.map(PrismaClientMapper.toDomain);
  }

  async update(client: UpdateClientRequest): Promise<Client> {
    const { id, ...raw } = PrismaClientMapper.toPrismaUpdate(client);

    const updatedClient = await this.prismaService.clients.update({
      where: { id: id },
      data: {
        name: raw.name,
        email: raw.email,
        phone: raw.phone,
        cpf: raw.cpf,
        address: {
          upsert: { set: null, update: raw.address },
        },
      },
    });

    return PrismaClientMapper.toDomain(updatedClient);
  }

  async delete(id: string): Promise<Client> {
    const client = await this.prismaService.clients.delete({
      where: { id: id },
    });

    return PrismaClientMapper.toDomain(client);
  }
}
