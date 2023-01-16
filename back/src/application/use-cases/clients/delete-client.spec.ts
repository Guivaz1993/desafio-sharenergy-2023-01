import { makeClient } from '@test/factories/clients-factory';
import { InMemoryClientRepository } from '@test/repositories/in-memory-clients-repository';
import { CreateClient } from './create-client';
import { DeleteClient } from './delete-client';

describe('Delete Clients', () => {
  let clientRepository: InMemoryClientRepository;

  const namesClients = ['Cliente 1', 'Cliente 2', 'Cliente 3'];

  beforeAll(async () => {
    clientRepository = new InMemoryClientRepository();
    const createClient = new CreateClient(clientRepository);

    namesClients.forEach(async (name) => {
      await createClient.execute(makeClient({ name }));
    });
  });

  it('Should be able to delete client', async () => {
    const deleteClient = new DeleteClient(clientRepository);

    const client = await deleteClient.execute(clientRepository.clients[0].id);

    expect(clientRepository.clients.length).toBeLessThan(3);
    expect(client.name).toEqual('Cliente 1');
  });
});
