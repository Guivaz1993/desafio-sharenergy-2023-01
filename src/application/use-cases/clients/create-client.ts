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
  number?: string;
  complement?: string;
}

interface CreateClientResponse {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: Address;
}

@Injectable()
export class CreateClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(request: CreateClientRequest): Promise<CreateClientResponse> {
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

    await this.clientRepository.create(client);

    return client;
  }
}
