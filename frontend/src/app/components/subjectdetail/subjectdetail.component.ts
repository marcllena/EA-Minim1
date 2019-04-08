import { Component, OnInit } from '@angular/core';
import { SubjectServices } from "../../services/subject.services";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.services";

@Component({
  selector: 'app-subjectdetail',
  templateUrl: './subjectdetail.component.html',
  styleUrls: ['./subjectdetail.component.css','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
  '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class SubjectdetailComponent implements OnInit {

//Com a variables globals, posem:
  subject: Object;
  subjectId: string;

  //Com a constructor, pasem els Services (on estaran implementades les funcions), el servei de Dades (per passar dades entre components) i el Router
  constructor(private subjectService: SubjectServices,private dataService:DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.clickedSubjectId.subscribe(subjectId => this.subjectId = subjectId)
    console.log("Id del element clickat: "+this.subjectId)
    if(this.subjectId=="0")
    {
      this.router.navigateByUrl("/");
    }
    this.obtainSubject()
  }

  obtainSubject() {
    console.log("Operació de demanar informació sobre una asignatura");
    if(this.subjectId!="0") {
      this.subjectService.obtainSubject(this.subjectId)
        .subscribe(response => {
            console.log("Resposta del BackEnd" + response.body);
            //Podem filtrar per tots els codis 2XX
            if (response.status == 200) {
              this.subject = response.body;
            } else {
              //Error desconegut
              console.log("Error");
            }
          },
          err => {
            console.log("Error del BackEnd" + err);
            //Podem filtrar per tots els altres codis
          });
    }
  }

  botoLlista(id) {
    this.dataService.changeStudentId(id);
    this.router.navigateByUrl("/api/student");
  }

  botoAfagir() {
    this.router.navigateByUrl("/api/form");
  }
  botoAfagirId() {
    this.router.navigateByUrl("/api/formId");
  }
}
