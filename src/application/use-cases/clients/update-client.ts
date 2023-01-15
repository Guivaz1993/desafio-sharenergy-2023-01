import { Client } from '@application/entities/clients/client';
import { ClientRepository } from '@application/repositories/clients-repository';
import { Injectable } from '@nestjs/common';
import { UpdateClientRequest } from '@application/entities/clients/client';

@Injectable()
export class UpdateClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(client: UpdateClientRequest): Promise<Client> {
    const updatedClient = await this.clientRepository.update(client);

    return updatedClient;
  }
}
