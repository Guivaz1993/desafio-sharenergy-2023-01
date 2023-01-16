import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-users-repository';
import { FindUserByUsername } from './find-by-username-user';
import { CreateUser } from './create-user';

describe('Find By Username', () => {
  let userRepository;

  const userCreated = { username: 'username', password: '12345678' };
  beforeAll(async () => {
    userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);

    await createUser.execute(userCreated);
  });

  it('Should be able to find a user', async () => {
    const findUser = new FindUserByUsername(userRepository);

    const { user } = await findUser.execute({ username: userCreated.username });

    expect(user.username).toBe(userCreated.username);
  });

  it('Should not be able to find a user', async () => {
    const findUser = new FindUserByUsername(userRepository);

    const { user } = await findUser.execute({ username: 'nomedeusuário' });

    expect(user).toBeFalsy();
  });
});
