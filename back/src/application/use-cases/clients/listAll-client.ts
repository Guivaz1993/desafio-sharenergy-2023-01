import { Client } from '@application/entities/clients/client';
import { ClientRepository } from '@application/repositories/clients-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAll {
  constructor(private clientRepository: ClientRepository) {}

  async execute(): Promise<Client[]> {
    const list = await this.clientRepository.listAll();

    return list;
  }
}
