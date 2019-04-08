import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {StationDetailComponent} from "./components/station-detail/station-detail.component";

const routes: Routes = [
  { path: 'api/main', component: MainComponent},
  { path: '', redirectTo: '/api/main', pathMatch: 'full' },
  { path: 'api/', redirectTo: '/api/main', pathMatch: 'full' },
  { path: 'api/station', component: StationDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
