import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-users-repository';
import { CreateUser } from './create-user';

describe('Create User', () => {
  it('Should be able to create a user', async () => {
    const userRepository = new InMemoryUserRepository();

    const createUser = new CreateUser(userRepository);

    const { user } = await createUser.execute({
      username: 'username',
      password: '12345678',
    });

    expect(userRepository.user).toHaveLength(1);
    expect(userRepository.user[0]).toBe(user);
  });

  it('Should not be able to create a user', async () => {
    const userRepository = new InMemoryUserRepository();

    const createUser = new CreateUser(userRepository);

    expect(() => {
      return createUser.execute({
        username: 'username',
        password: '12345',
      });
    }).rejects.toThrowError("O 'password' deve conter pelo menos 6 caracteres");
  });
});
