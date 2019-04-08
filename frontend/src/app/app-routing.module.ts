import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {FormComponent} from "./components/form/form.component";
import {SubjectdetailComponent} from "./components/subjectdetail/subjectdetail.component";
import {StudentdetailComponent} from "./components/studentdetail/studentdetail.component";
import {FormSubjectComponent} from "./components/form-subject/form-subject.component";
import {FormIdComponent} from "./components/form-id/form-id.component";
import {FormModelComponent} from "./components/form-model/form-model.component";
import {ModelDetailComponent} from "./components/model-detail/model-detail.component";

const routes: Routes = [
  { path: 'api/main', component: MainComponent},
  { path: '', redirectTo: '/api/main', pathMatch: 'full' },
  { path: 'api/', redirectTo: '/api/main', pathMatch: 'full' },
  { path: 'api/subject', component: SubjectdetailComponent},
  { path: 'api/student', component: StudentdetailComponent},
  { path: 'api/form', component: FormComponent},
  { path: 'api/formId', component: FormIdComponent},
  { path: 'api/formSubject', component: FormSubjectComponent},
  { path: 'api/formModel', component: FormModelComponent},
  { path: 'api/modelDetail', component: ModelDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
