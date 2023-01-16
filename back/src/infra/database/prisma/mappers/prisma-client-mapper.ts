import { Address } from '@application/entities/clients/address';
import {
  Client,
  UpdateClientRequest,
} from '@application/entities/clients/client';
import { Clients as RawClient } from '@prisma/client';

export class PrismaClientMapper {
  static toPrisma(client: Client) {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      cpf: client.cpf,
      phone: client.phone,
      address: {
        street: client.address.street,
        city: client.address.city,
        state: client.address.state,
        zip: client.address.zip,
        number: client.address.number,
        complement: client.address.complement,
      },
    };
  }

  static toPrismaUpdate(client: UpdateClientRequest) {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      cpf: client.cpf,
      phone: client.phone,
      address: {
        street: client.street,
        city: client.city,
        state: client.state,
        zip: client.zip,
        number: client.number,
        complement: client.complement,
      },
    };
  }

  static toDomain(raw: RawClient): Client {
    return new Client(
      {
        name: raw.name,
        email: raw.email,
        cpf: raw.cpf,
        phone: raw.phone,
        address: new Address(raw.address),
      },
      raw.id,
    );
  }
}
