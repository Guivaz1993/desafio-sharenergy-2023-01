import { Address } from '@application/entities/clients/address';
import { Client } from '@application/entities/clients/client';
import { ClientRepository } from '@application/repositories/clients-repository';
import { Injectable } from '@nestjs/common';

interface CreateClientRequest {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  number: string;
  complement: string;
}

@Injectable()
export class CreateClient {
  constructor(private clientRepository: ClientRepository) {}

  async create(request: CreateClientRequest): Promise<Client> {
    const {
      name,
      email,
      phone,
      cpf,
      street,
      city,
      state,
      zip,
      number,
      complement,
    } = request;

    const client = new Client({
      name,
      email,
      phone,
      cpf,
      address: new Address({
        street,
        city,
        state,
        zip,
        number,
        complement,
      }),
    });

    const newClient = await this.clientRepository.create(client);

    return newClient;
  }
}
