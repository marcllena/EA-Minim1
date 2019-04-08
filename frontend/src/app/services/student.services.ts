import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Environment } from "./environment";

@Injectable({
  providedIn: 'root'
})
export class StudentServices {

  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  obtainStudent(studentId) {
    return this.http.get(this.environment.url + "getStudent/"+studentId, {observe: 'response'})
  }
  addStudent(subjectId, Student) {
    return this.http.post(this.environment.url + "addStudent/"+subjectId,Student, {observe: 'response'})
  }
  addStudentToSubject(subjectId, studentId) {
    return this.http.get(this.environment.url + "/addStudentSubject/"+subjectId+"/"+studentId, {observe: 'response'})
  }
  removeStudentFromSubject(subjectId, studentId) {
    return this.http.get(this.environment.url + "/removeStudentSubject/"+subjectId+"/"+studentId, {observe: 'response'})
  }
}
