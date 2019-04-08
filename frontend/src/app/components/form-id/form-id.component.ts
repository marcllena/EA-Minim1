import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {StudentServices } from "../../services/student.services";
import {DataService} from "../../services/data.services";

declare var M: any;

@Component({
  selector: 'app-form-id',
  templateUrl: './form-id.component.html',
  styleUrls: ['./form-id.component.css','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class FormIdComponent implements OnInit {

  //Com a variables globals, posem el Form (tipus FormGroup), i els missatges de validació.
  Form: FormGroup;
  validation_messages: any;
  subjectId: string;

  //Com a constructor, pasem els Services (on estaran implementades les funcions), el servei de Dades (per passar dades entre components),
  // el Router i el constructor de Form, formBuilder
  constructor(private router: Router,private studentService: StudentServices, private dataService:DataService,private formBuilder: FormBuilder) {
    this.Form = this.formBuilder.group({
        //Posem els diferents camps indicant si son requerits (Validators.required), i el patro
        id: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{20,30}$/)])),
      }


    )

  }

  ngOnInit() {
    this.dataService.clickedSubjectId.subscribe(subjectId => this.subjectId = subjectId)
    if(this.subjectId=="0")
    {
      this.router.navigateByUrl("/");
    }
    document.body.classList.add('bg-img');
    this.validation_messages = {
      //Per cada camp, podem possar un missatge de requeriment, de patro i d'error.
      'id': [
        { type: 'required', message: 'Id del Alumno: Requerido'},
        { type: 'pattern', message: 'Id del Alumno: Debe contener entre 20 i 30 carácteres' },
        { type: 'error', message: 'Error: No existe ningun alumno con ese Id o ya esta en la asignatura' }
      ],
    }
  }
  peticioFormId() {
    console.log("Operació d'afagir un estudiant per ID realitzada al BackEnd:" + this.Form.value.id);
    //Creem el objecte que passarem a la petició, important fer-ho en el ordre del constructor

    this.studentService.addStudentToSubject(this.subjectId, this.Form.value.id)
      .subscribe(response => {
          console.log("Resposta del BackEnd" + response);
          //Podem filtrar per tots els codis 2XX
          if (response.status == 200) {
            //Operació Realitzada Correctament
            M.toast({html: 'Alumno añadido a la asignatura'});
            this.router.navigateByUrl("/api/subject");
          } else {
            //Error desconegut
            console.log("Error");
          }
        },
        err => {
          console.log("Error del BackEnd" + err);
          //Podem filtrar per tots els altres codis
          if (err.status == 400) {
            //Ha de ser per l'ID incorrecte
            //Podem activar l'error d'un dels camps
            this.Form.get("id").setErrors({
              error: true
            });
          } else if (err.status == 500) {
            //Error desconegut
            this.Form.get("id").setErrors({
              error: true
            });
          }
        });
  }

}

