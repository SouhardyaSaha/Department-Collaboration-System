import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
// import { ClassroomShowComponent } from './classroom-show/classroom-show.component';
import { ClassRoutineComponent } from './class-routine/class-routine.component';

@NgModule({
  declarations: [
    StudentComponent,
    HomeComponent,
    // ClassroomShowComponent,
    ClassRoutineComponent,
  ],
  imports: [CommonModule, MaterialModule, StudentRoutingModule],
})
export class StudentModule {}
