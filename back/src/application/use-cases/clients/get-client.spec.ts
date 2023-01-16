import { makeClient } from '@test/factories/clients-factory';
import { InMemoryClientRepository } from '@test/repositories/in-memory-clients-repository';
import { CreateClient } from './create-client';
import { GetClient } from './get-client';

describe('Find Client by Id', () => {
  let clientRepository: InMemoryClientRepository;

  const namesClients = ['Cliente 1', 'Cliente 2', 'Cliente 3'];

  beforeAll(async () => {
    clientRepository = new InMemoryClientRepository();
    const createClient = new CreateClient(clientRepository);

    namesClients.forEach(async (name) => {
      await createClient.execute(makeClient({ name }));
    });
  });

  it('Should be able to find a client', async () => {
    const getClient = new GetClient(clientRepository);

    const client = await getClient.execute(clientRepository.clients[0].id);

    expect(client.name).toEqual('Cliente 1');
  });

  it('Should not be able to find a client', async () => {
    const getClient = new GetClient(clientRepository);

    const client = await getClient.execute('invalid-id');

    expect(client).toBeNull();
  });
});
