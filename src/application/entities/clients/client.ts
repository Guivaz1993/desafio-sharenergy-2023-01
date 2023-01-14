import { Address } from './address';

export interface ClientProps {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: Address;
}

export class Client {
  private _id: string;
  private props: ClientProps;

  constructor(props: ClientProps, id?: string) {
    this._id = id ?? undefined;
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }
  public get email(): string {
    return this.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }
  public get cpf(): string {
    return this.props.cpf;
  }

  public set cpf(cpf: string) {
    this.props.cpf = cpf;
  }
  public get phone(): string {
    return this.props.phone;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }
  public get address(): Address {
    return this.props.address;
  }

  public set address(address: Address) {
    this.props.address = address;
  }
}
