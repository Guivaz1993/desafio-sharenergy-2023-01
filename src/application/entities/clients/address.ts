export class Address {
  private street: string;
  private city: string;
  private state: string;
  private zip: string;
  private number?: string;
  private complement?: string;

  constructor({ street, city, state, zip, number, complement }) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.number = number;
    this.complement = complement;
  }

  public get getStreet(): string {
    return this.street;
  }

  public set setStreet(street: string) {
    this.street = street;
  }

  public get getCity(): string {
    return this.city;
  }

  public set setCity(city: string) {
    this.city = city;
  }
  public get getState(): string {
    return this.state;
  }

  public set setState(state: string) {
    this.state = state;
  }
  public get getZip(): string {
    return this.zip;
  }

  public set setZip(zip: string) {
    this.zip = zip;
  }
  public get getNumber(): string {
    return this.number;
  }

  public set setNumber(number: string) {
    this.number = number;
  }
  public get getComplement(): string {
    return this.complement;
  }

  public set setComplement(complement: string) {
    this.complement = complement;
  }
}
