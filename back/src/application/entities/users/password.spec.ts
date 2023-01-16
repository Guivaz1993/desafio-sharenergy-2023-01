import { Password } from './password';

describe('Password', () => {
  it('it should be able to create a password', () => {
    const password = new Password('password');

    expect(password).toBeTruthy();
    expect(password).not.toBe('passoword');
  });

  it('it should not be able to create a password', () => {
    expect(() => new Password('senha')).toThrowError();
  });
});
