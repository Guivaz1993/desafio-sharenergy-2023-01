import { Address, UpdateAddressRequest } from './address';

export interface ClientProps {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: Address;
}

export interface UpdateClientRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  // address?: UpdateAddressRequest;
  street: string;
  city: string;
  state: string;
  zip: string;
  number?: string;
  complement?: string;
}

export class Client {
  private _id: string;
  private props: ClientProps;

  private validatePropsLength(prop: string): boolean {
    return prop.trim().length >= 1;
  }

  constructor(props: ClientProps, id?: string) {
    if (!this.validatePropsLength(props.name)) {
      throw new Error("O campo 'name' não deve estar vazio");
    }

    if (!this.validatePropsLength(props.cpf)) {
      throw new Error("O campo 'cpf' não deve estar vazio");
    }

    if (!this.validatePropsLength(props.email)) {
      throw new Error("O campo 'email' não deve estar vazio");
    }

    if (!this.validatePropsLength(props.phone)) {
      throw new Error("O campo 'phone' não deve estar vazio");
    }

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
    return this.props.email;
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

  // public set city(city: string) {
  //   this.props.address.city = city;
  // }
  // public set state(state: string) {
  //   this.props.address.state = state;
  // }
  // public set street(street: string) {
  //   this.props.address.street = street;
  // }
  // public set zip(zip: string) {
  //   this.props.address.zip = zip;
  // }
  public set number(number: string) {
    this.props.address.city = number;
  }
  // public set complement(complement: string) {
  //   this.props.address.complement = complement;
  // }
}
