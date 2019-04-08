import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Environment } from "./environment";

@Injectable({
  providedIn: 'root'
})
export class StationServices {

  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  obtainStations() {
    return this.http.get(this.environment.url + "getStations", {observe: 'response'})
  }

  obtainBikesStation(stationId) {
    return this.http.get(this.environment.url + "getBikesStation/"+stationId, {observe: 'response'})
  }

}
