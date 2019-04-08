export class Student {
  _id: string;
  name: string;
  address: string;
  phones: [{
    name: String,
    address: String
  }]


  constructor(name: string, address: string, phones: [{ name: String, address: String }]) {
    this.name = name;
    this.address = address;
    this.phones = phones;
  }
}
