import { Client } from '@application/entities/clients/client';

export class ClientViewModel {
  static toHttp(client: Client) {
    return {
      id: client.id,
      name: client.name,
      phone: client.phone,
      cpf: client.cpf,
      email: client.email,
      zip: client.address.zip,
      state: client.address.state,
      city: client.address.city,
      street: client.address.street,
      number: client.address.number,
      complement: client.address.complement,
    };
  }
}
