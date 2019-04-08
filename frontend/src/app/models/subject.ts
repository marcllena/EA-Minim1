export class Subject {
  _id: string;
  name: string;
  students:[]

  constructor(name: string, students: []) {
    this.name = name;
    this.students = students;
  }

}
