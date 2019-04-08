import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FormComponent } from './components/form/form.component';
import { SubjectdetailComponent } from './components/subjectdetail/subjectdetail.component';
import {DataService} from "./services/data.services";
import { StudentdetailComponent } from './components/studentdetail/studentdetail.component';
import { FormSubjectComponent } from './components/form-subject/form-subject.component';
import { FormIdComponent } from './components/form-id/form-id.component';
import { ModelDetailComponent } from './components/model-detail/model-detail.component';
import { FormModelComponent } from './components/form-model/form-model.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FormComponent,
    SubjectdetailComponent,
    StudentdetailComponent,
    FormSubjectComponent,
    FormIdComponent,
    ModelDetailComponent,
    FormModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
