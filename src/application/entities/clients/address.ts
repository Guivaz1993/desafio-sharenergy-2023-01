export interface AddressProps {
  street: string;
  city: string;
  state: string;
  zip: string;
  number?: string;
  complement?: string;
}

export class Address {
  private props: AddressProps;

  constructor(props: AddressProps) {
    this.props = props;
  }

  public get street(): string {
    return this.props.street;
  }

  public set street(street: string) {
    this.props.street = street;
  }

  public get city(): string {
    return this.props.city;
  }

  public set city(city: string) {
    this.props.city = city;
  }
  public get state(): string {
    return this.props.state;
  }

  public set state(state: string) {
    this.props.state = state;
  }
  public get zip(): string {
    return this.props.zip;
  }

  public set zip(zip: string) {
    this.props.zip = zip;
  }
  public get number(): string {
    return this.props.number;
  }

  public set number(number: string) {
    this.props.number = number;
  }
  public get complement(): string {
    return this.props.complement;
  }

  public set complement(complement: string) {
    this.props.complement = complement;
  }
}
