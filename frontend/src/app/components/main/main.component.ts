import { Component, OnInit } from '@angular/core';
import { StationServices } from "../../services/station.services";
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
  constructor(private stationService: StationServices,private dataService:DataService, private router: Router) { }

  ngOnInit() {
    this.llistaStations();
  }

  llistaStations() {
    console.log("Operació de demanar estacions realitzada al BackEnd:");
    this.stationService.obtainStations()
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
            console.log("No hi han estacions")
            this.llista=null;
            M.toast({html: 'No hay estaciones en la base de datos.'});
          }
          else {
            //Error desconegut
            console.log("Error");
          }
        });
  }
  botoLlista(id,name) {
    this.dataService.changeStationId(id);
    this.dataService.changeStationName(name);
    this.router.navigateByUrl("/api/station");
  }
}
