import { Client } from '../entities/clients/client';

export abstract class ClientRepository {
  abstract create(client: Client): Promise<Client>;
  abstract get(username: string): Promise<Client | null>;
  abstract listAll(): Promise<Client[] | null>;
  abstract update(client: Client): Promise<Client>;
  abstract delete(id: string): Promise<Client>;
}
