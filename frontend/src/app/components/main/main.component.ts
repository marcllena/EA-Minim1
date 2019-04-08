import { Component, OnInit } from '@angular/core';
import { SubjectServices } from "../../services/subject.services";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.services";

declare var M: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class MainComponent implements OnInit {

  //Com a variables globals, posem simplement la llista
  llista: Object;

  //Com a constructor, pasem els Services (on estaran implementades les funcions), el servei de Dades (per passar dades entre components) i el Router
  constructor(private subjectService: SubjectServices,private dataService:DataService, private router: Router) { }

  ngOnInit() {
    this.llistaSubjects();
  }

  llistaSubjects() {
    console.log("Operació de demanar usuaris realitzada al BackEnd:");
    this.subjectService.obtainSubjects()
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          //Podem filtrar per tots els codis 2XX
          if(response.status==200){
            this.llista=response.body;
          }
          else {
            //Error desconegut
            console.log("Error");
          }
        },
        err => {
          console.log("Error del BackEnd"+err);
          //Podem filtrar per tots els altres codis
          if(err.status==400){
            console.log("No hi han assignatures")
            this.llista=null;
            M.toast({html: 'No hay asignaturas en la base de datos.'});
          }
          else {
            //Error desconegut
            console.log("Error");
          }
        });
  }
  botoLlista(id) {
    this.dataService.changeSubjectId(id);
    this.router.navigateByUrl("/api/subject");
  }
  botoLlista2(id) {
    console.log("Operació d'eliminar l'assignatura amb Id:"+id);
    this.subjectService.deleteSubject(id)
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          //Podem filtrar per tots els codis 2XX
          if(response.status==204){
            M.toast({html: 'Asignatura Eliminada'});
            this.llistaSubjects();
          }
          else if(response.status==200){
            M.toast({html: 'Antes de eliminar la asignatura, elimina todos sus alumnos'});
          }
          else {
            //Error desconegut
            console.log("Error");
          }
        },
        err => {
          console.log("Error del BackEnd"+err);
          //Podem filtrar per tots els altres codis
          if(err.status==400){
            console.log("Error")
          }
          else {
            //Error desconegut
            console.log("Error");
          }
        });
  }
  afagirSubject(){
    this.router.navigateByUrl("/api/formSubject");
  }
}
