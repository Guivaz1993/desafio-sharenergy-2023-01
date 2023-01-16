import { makeClient } from '@test/factories/clients-factory';
import { InMemoryClientRepository } from '@test/repositories/in-memory-clients-repository';
import { CreateClient } from './create-client';
import { UpdateClient } from './update-client';

describe('Update Client', () => {
  let clientRepository: InMemoryClientRepository;

  const namesClients = ['Cliente 1', 'Cliente 2', 'Cliente 3'];

  beforeAll(async () => {
    clientRepository = new InMemoryClientRepository();
    const createClient = new CreateClient(clientRepository);

    namesClients.forEach(async (name) => {
      await createClient.execute(makeClient({ name }));
    });
  });

  it('Should be able to list clients', async () => {
    const updateClient = new UpdateClient(clientRepository);

    const client = await updateClient.execute({
      id: clientRepository.clients[0].id,
      name: 'Cliente atualizado',
    });

    expect(client.name).not.toEqual('Cliente 1');
    expect(client.name).toEqual('Cliente atualizado');
  });
});
