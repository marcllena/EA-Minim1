import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Environment } from "./environment";

@Injectable({
  providedIn: 'root'
})
export class SubjectServices {

  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  obtainSubjects() {
    return this.http.get(this.environment.url + "getSubjects", {observe: 'response'})
  }
  obtainSubject(subjectId) {
    return this.http.get(this.environment.url + "getSubject/"+subjectId, {observe: 'response'})
  }
  addSubject(subject) {
    return this.http.post(this.environment.url + "addSubject",subject, {observe: 'response'})
  }
  deleteSubject(subjectId) {
    return this.http.get(this.environment.url + "deleteSubject/"+subjectId, {observe: 'response'})
  }
}
