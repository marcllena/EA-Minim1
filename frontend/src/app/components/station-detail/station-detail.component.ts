import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../services/data.services";
import { StationServices } from "../../services/station.services";
import { BikeServices } from "../../services/bike.services";

//Per els toast fem:
declare var M: any;

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.css','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class StationDetailComponent implements OnInit {
  //Si cambiem el nom cal també fer-ho al app.module.ts i hem de definir les rutes a app-routing module



//Com a variables globals, posem:
  bikesStation: Object;
  unnasignedBikes: Object;
  stationId: string;
  stationName:string;

  //Com a constructor, pasem els Services (on estaran implementades les funcions), el servei de Dades (per passar dades entre components) i el Router
  constructor(private bikeService: BikeServices,private stationService: StationServices,private dataService:DataService, private router: Router) { }

  ngOnInit() {
    //Si obtenim el id del element de DataService:
    this.dataService.clickedStationId.subscribe(stationId => this.stationId = stationId)
    this.dataService.clickedStationName.subscribe(stationName => this.stationName = stationName)
    console.log("Id del element clickat: "+this.stationId)
    if(this.stationId=="0")
    {
      this.router.navigateByUrl("/");
    }

    //Cridem a la funció al arrencar
    this.obtainStationBikes()
    this.obtainUnnasignedBikes()
  }

  obtainStationBikes() {
    console.log("Operació de demanar bicis de l'estacio");
    if(this.stationId!="0") {
      this.stationService.obtainBikesStation(this.stationId)
        .subscribe(response => {
            console.log("Resposta del BackEnd" + response.body);
            //Podem filtrar per tots els codis 2XX
            if (response.status == 200) {
              this.bikesStation = response.body;
              console.log("Proba ***" + this.bikesStation.toString());
            }
            else if (response.status == 204) {
              M.toast({html: "La estacion "+this.stationName+" no tiene bicis"});
              this.bikesStation = 0;
            }
            else {
              //Error desconegut
              console.log("Error");
            }
          },
          err => {
            console.log("Error del BackEnd" + err);
            //Podem filtrar per tots els altres codis
            M.toast({html: 'Error al solicitar las bicis'});
          });
    }
  }
  obtainUnnasignedBikes() {
    console.log("Operació de demanar bicis sense assignar");
    if(this.stationId!="0") {
      this.bikeService.obtainUnnasignedBikes()
        .subscribe(response => {
            console.log("Resposta del BackEnd" + response.body);
            //Podem filtrar per tots els codis 2XX
            if (response.status == 200) {
              this.unnasignedBikes = response.body;
            }
            else if (response.status == 204) {
              M.toast({html: 'No hay bicis sin asignar'});
              this.unnasignedBikes = 0;
            }
            else {
              //Error desconegut
              console.log("Error");
            }
          },
          err => {
            console.log("Error del BackEnd" + err);
            //Podem filtrar per tots els altres codis
            M.toast({html: 'Error al solicitar las bicis'});
          });
    }

  }

  botoAsignar(bike_id){
    console.log("Operació de assignar la Bici amb id "+bike_id);
    this.bikeService.assignBike(this.stationId,bike_id)
        .subscribe(response => {
            console.log("Resposta del BackEnd" + response.body);
            //Podem filtrar per tots els codis 2XX
            if (response.status == 200) {
              M.toast({html: 'Bici asignada correctamente'});
              this.obtainStationBikes()
              this.obtainUnnasignedBikes()
            }
            else {
              //Error desconegut
              console.log("Error");
            }
          },
          err => {
            if (err.status == 400) {
              M.toast({html: 'Error al Asignar'});
              this.obtainStationBikes()
              this.obtainUnnasignedBikes()
            }
            else {
              //Error desconegut
              console.log("Error");
            }
          });
    }

  botoDesAsignar(bike_id) {
      console.log("Operació de desassignar la Bici amb id "+bike_id);
      this.bikeService.desAssignBike(this.stationId,bike_id)
        .subscribe(response => {
            console.log("Resposta del BackEnd" + response.body);
            //Podem filtrar per tots els codis 2XX
            if (response.status == 200) {
              M.toast({html: 'Bici desasignada correctamente'});
              this.obtainStationBikes()
              this.obtainUnnasignedBikes()
            }
            else {
              //Error desconegut
              console.log("Error");
            }
          },
          err => {
            if (err.status == 400) {
              M.toast({html: 'Error al Desasignar'});
              this.obtainStationBikes()
              this.obtainUnnasignedBikes()
            }
            else {
              //Error desconegut
              console.log("Error");
            }
          });
    }

}

