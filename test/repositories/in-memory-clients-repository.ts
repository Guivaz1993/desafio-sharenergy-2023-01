import {
  Client,
  UpdateClientRequest,
} from '@application/entities/clients/client';
import { ClientRepository } from '@application/repositories/clients-repository';

export class InMemoryClientRepository implements ClientRepository {
  public clients: Client[] = [];

  async get(id: string): Promise<Client> {
    const client = this.clients.find((iten) => {
      return iten.id === id;
    });

    if (!client) {
      return null;
    }

    return client;
  }

  async create(client: Client): Promise<Client> {
    this.clients.push(client);

    const newClient = this.clients[this.clients.length];

    return newClient;
  }

  async listAll(): Promise<Client[]> {
    return this.clients;
  }

  async update(client: UpdateClientRequest): Promise<Client> {
    const updatedClient = this.clients.find((iten) => {
      return iten.id === client.id;
    });

    if (!updatedClient) {
      return null;
    }

    updatedClient.cpf = client.cpf ? client.cpf : updatedClient.cpf;
    updatedClient.email = client.email ? client.email : updatedClient.email;
    updatedClient.name = client.name ? client.name : updatedClient.name;
    updatedClient.phone = client.phone ? client.phone : updatedClient.phone;

    updatedClient.address.city = client.city
      ? client.city
      : updatedClient.address.city;
    updatedClient.address.complement = client.complement
      ? client.complement
      : updatedClient.address.complement;
    updatedClient.address.number = client.number
      ? client.number
      : updatedClient.address.number;
    updatedClient.address.state = client.state
      ? client.state
      : updatedClient.address.state;
    updatedClient.address.street = client.street
      ? client.street
      : updatedClient.address.street;
    updatedClient.address.zip = client.zip
      ? client.zip
      : updatedClient.address.zip;

    return updatedClient;
  }

  async delete(id: string): Promise<Client> {
    const client = this.clients.find((iten) => {
      return iten.id === id;
    });

    if (!client) {
      return null;
    }

    this.clients = this.clients.filter((iten) => iten.id !== id);

    return client;
  }
}
