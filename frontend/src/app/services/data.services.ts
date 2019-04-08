import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  //Clase per intercambiar parametres entre els components

  private originalStationId = new BehaviorSubject("0");
  clickedStationId = this.originalStationId.asObservable()

  private originalStationName = new BehaviorSubject("0");
  clickedStationName = this.originalStationName.asObservable()

  constructor() { }

  changeStationId(id: string) {
    this.originalStationId.next(id)
  }

  changeStationName(name: string) {
    this.originalStationName.next(name)
  }


}
