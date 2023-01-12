export class Password {
  private readonly password: string;

  get value(): string {
    return this.password;
  }

  private validatePasswordLength(password: string): boolean {
    return password.length >= 6;
  }

  constructor(password: string) {
    const isPasswordLengthValid = this.validatePasswordLength(password);

    if (!isPasswordLengthValid) {
      throw new Error("O 'password' deve conter pelo menos 6 caracteres");
    }

    this.password = password;
  }
}
