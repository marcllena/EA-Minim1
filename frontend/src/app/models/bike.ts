export class Bike {
  _id: string;
  name: string;
  kms: number;
  description: String;
  assigned: boolean;


  constructor(name: string, kms: number, description: String, assigned: boolean) {
    this.name = name;
    this.kms = kms;
    this.description = description;
    this.assigned = assigned;
  }
}
