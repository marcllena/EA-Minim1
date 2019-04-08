import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  //Clase per intercambiar parametres entre els components

  private originalSubjectId = new BehaviorSubject("0");
  clickedSubjectId = this.originalSubjectId.asObservable()


  private originalStudentId = new BehaviorSubject("0");
  clickedStudentId = this.originalStudentId.asObservable()

  constructor() { }

  changeSubjectId(id: string) {
    this.originalSubjectId.next(id)
  }

  changeStudentId(id: string) {
    this.originalStudentId.next(id)
  }


}
