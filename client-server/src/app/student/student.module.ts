import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [StudentComponent, HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
