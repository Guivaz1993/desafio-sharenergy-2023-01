import { Password } from './password';
import { User } from './user';

describe('User', () => {
  it('it should be able to create a user', () => {
    const user = new User({
      password: new Password('password'),
      username: 'User Test',
    });

    expect(user).toBeTruthy();
  });
});
