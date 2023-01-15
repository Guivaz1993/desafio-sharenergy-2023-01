import { Address } from '@application/entities/clients/address';
import { Client, ClientProps } from '@application/entities/clients/client';

type Override = Partial<ClientProps>;

export function makeClient(override: Override = {}) {
  const client = new Client({
    name: 'Client Um',
    email: 'client@email.com',
    phone: '12 12341234',
    cpf: '123.456.789-12',
    address: new Address({
      street: 'Av. rua',
      city: 'Cidade',
      state: 'SP',
      zip: '01010-100',
      number: '1',
    }),
    ...override,
  });

  return {
    name: client.name,
    email: client.email,
    phone: client.phone,
    cpf: client.cpf,
    street: client.address.street,
    city: client.address.city,
    state: client.address.state,
    zip: client.address.zip,
    number: client.address.number,
  };
}
