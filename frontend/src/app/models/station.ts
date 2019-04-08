export class Station {
  _id: string;
  name: string;
  description: string;
  state: {type: String, enum: ['available', 'NA']};
  bikes:[];

  constructor(name: string, description: string, state: { type: String; enum: ["available", "NA"] }, bikes: []) {
    this.name = name;
    this.description = description;
    this.state = state;
    this.bikes = bikes;
  }
}
