import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subject} from "../../models/subject"
import {SubjectServices } from "../../services/subject.services";
import {DataService} from "../../services/data.services";

declare var M: any;

@Component({
  selector: 'app-form-subject',
  templateUrl: './form-subject.component.html',
  styleUrls: ['./form-subject.component.css','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class FormSubjectComponent implements OnInit {

  //Com a variables globals, posem el Form (tipus FormGroup), i els missatges de validació.
  Form: FormGroup;
  validation_messages: any;
  subjectId: string;

  //Com a constructor, pasem els Services (on estaran implementades les funcions), el servei de Dades (per passar dades entre components),
  // el Router i el constructor de Form, formBuilder
  constructor(private router: Router,private subjectServices: SubjectServices, private dataService:DataService,private formBuilder: FormBuilder) {
    this.Form = this.formBuilder.group({
        //Posem els diferents camps indicant si son requerits (Validators.required), i el patro
        name: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{0,15}$/)])),
      }
    )
  }

  ngOnInit() {
    document.body.classList.add('bg-img');
    this.validation_messages = {
      //Per cada camp, podem possar un missatge de requeriment, de patro i d'error.
      'name': [
        { type: 'required', message: 'Nombre de la Asignatura: Requerido'},
        { type: 'pattern', message: 'Nombre de la Asignatura: Debe contener 15 carácteres como máximo' },
        { type: 'error', message: 'Error: Ya existe una asignatura con este nombre'}
      ],
    }
  }

  peticioForm() {
    console.log("Operació d'afagir una asignatura realitzada al BackEnd:" + this.Form.value);
    let subject = new Subject(this.Form.value.name,[])
    this.subjectServices.addSubject(subject)
      .subscribe(response => {
          console.log("Resposta del BackEnd" + response);
          //Podem filtrar per tots els codis 2XX
          if (response.status == 200) {
            //Operació Realitzada Correctament
            M.toast({html: 'Subject Añadido'});
            this.router.navigateByUrl("/");
          } else {
            //Error desconegut
            console.log("Error");
          }
        },
        err => {
          console.log("Error del BackEnd" + err);
          //Podem filtrar per tots els altres codis
          if (err.status == 403) {
            console.log("403");
            //Podem activar l'error d'un dels camps
            this.Form.get("name").setErrors({
              error: true
            });
          } else if (err.status == 500) {
            //Error desconegut
            console.log("Error");
          }
        });
  }

}

