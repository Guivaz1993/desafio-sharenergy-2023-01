import { makeClient } from '@test/factories/clients-factory';
import { InMemoryClientRepository } from '@test/repositories/in-memory-clients-repository';
import { CreateClient } from './create-client';
import { ListAll } from './listAll-client';

describe('List Clients', () => {
  let clientRepository;

  const namesClients = ['Cliente 1', 'Cliente 2', 'Cliente 3'];

  beforeAll(async () => {
    clientRepository = new InMemoryClientRepository();
    const createClient = new CreateClient(clientRepository);

    namesClients.forEach(async (name) => {
      await createClient.execute(makeClient({ name }));
    });
  });

  it('Should be able to list clients', async () => {
    const listAll = new ListAll(clientRepository);

    const list = await listAll.execute();

    expect(list.length).toBeGreaterThanOrEqual(2);
    expect(list[0].name).toEqual('Cliente 1');
  });
});
