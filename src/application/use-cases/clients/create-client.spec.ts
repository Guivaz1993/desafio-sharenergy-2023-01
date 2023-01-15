import { InMemoryClientRepository } from '@test/repositories/in-memory-clients-repository';
import { CreateClient } from './create-client';

describe('Create Client', () => {
  it('Should be able to create a user', async () => {
    const clientRepository = new InMemoryClientRepository();

    const createClient = new CreateClient(clientRepository);

    const client = await createClient.execute({
      name: 'Client Um',
      email: 'client@email.com',
      phone: '12 12341234',
      cpf: '123.456.789-12',
      street: 'Av. rua',
      city: 'Cidade',
      state: 'SP',
      zip: '01010-100',
      number: '1',
    });

    expect(clientRepository.clients.length).toBeGreaterThanOrEqual(1);
    expect(clientRepository.clients[0]).toBe(client);
  });
  it('Should not be able to create a user', async () => {
    const clientRepository = new InMemoryClientRepository();

    const createClient = new CreateClient(clientRepository);

    expect(() => {
      return createClient.execute({
        name: '   ',
        email: 'client@email.com',
        phone: '12 12341234',
        cpf: '123.456.789-12',
        street: 'Av. rua',
        city: 'Cidade',
        state: 'SP',
        zip: '01010-100',
        number: '1',
      });
    }).rejects.toThrowError();
  });
});
