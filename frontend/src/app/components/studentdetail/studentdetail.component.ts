import { Component, OnInit } from '@angular/core';
import { StudentServices } from "../../services/student.services";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.services";

declare var M: any;

@Component({
  selector: 'app-userdetail',
  templateUrl: './studentdetail.component.html',
  styleUrls: ['./studentdetail.component.css','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class StudentdetailComponent implements OnInit {

//Com a variables globals, posem:
  student: Object;
  studentId: String;
  subjectId: String;

  //Com a constructor, pasem els Services (on estaran implementades les funcions), el servei de Dades (per passar dades entre components) i el Router
  constructor(private studentService: StudentServices,private dataService:DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.clickedStudentId.subscribe(studentId => this.studentId = studentId)
    console.log("Id del element clickat: "+this.studentId)
    if(this.studentId=="0")
    {
      this.router.navigateByUrl("/");
    }
    this.dataService.clickedSubjectId.subscribe(subjectId => this.subjectId = subjectId)
    console.log("Id del element clickat: "+this.subjectId)
    if(this.subjectId=="0")
    {
      this.router.navigateByUrl("/");
    }
    this.obtainStudent()
  }

  obtainStudent() {
    console.log("Operació de demanar informació sobre un estudiant");
    this.studentService.obtainStudent(this.studentId)
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          //Podem filtrar per tots els codis 2XX
          if(response.status==200){
            this.student=response.body;
          }
          else {
            //Error desconegut
            console.log("Error");
          }
        },
        err => {
          console.log("Error del BackEnd"+err);
          //Podem filtrar per tots els altres codis
        });
  }
  botoEliminar() {
    console.log("Operació per eliminar un estudiant");
    this.studentService.removeStudentFromSubject(this.subjectId,this.studentId)
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          //Podem filtrar per tots els codis 2XX
          if(response.status==200){
            M.toast({html: 'Alumno eliminado de la asignatura correspondiente'});
            this.router.navigateByUrl("/api/subject");
          }
          else if(response.status==204){
            M.toast({html: 'Alumno eliminado del sistema'});
            this.router.navigateByUrl("/api/subject");
          }
          else {
            //Error desconegut
            console.log("Error");
          }
        },
        err => {
          console.log("Error del BackEnd"+err);
          //Podem filtrar per tots els altres codis
        });
  }

}

