import { Client } from '@application/entities/clients/client';
import { ClientRepository } from '@application/repositories/clients-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(id: string): Promise<Client> {
    const client = await this.clientRepository.get(id);

    return client;
  }
}
