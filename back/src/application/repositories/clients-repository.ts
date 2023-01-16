import { Client, UpdateClientRequest } from '../entities/clients/client';

export abstract class ClientRepository {
  abstract create(client: Client): Promise<Client>;
  abstract get(id: string): Promise<Client | null>;
  abstract listAll(): Promise<Client[] | null>;
  abstract update(client: UpdateClientRequest): Promise<Client>;
  abstract delete(id: string): Promise<Client>;
}
