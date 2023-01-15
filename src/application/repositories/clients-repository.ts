import { Client, UpdateClientRequest } from '../entities/clients/client';

export abstract class ClientRepository {
  clients: any;
  abstract create(client: Client): Promise<Client>;
  abstract get(username: string): Promise<Client | null>;
  abstract listAll(): Promise<Client[] | null>;
  abstract update(client: UpdateClientRequest): Promise<Client>;
  abstract delete(id: string): Promise<Client>;
}
